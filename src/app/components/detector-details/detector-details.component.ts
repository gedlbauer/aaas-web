import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { DetectorsService } from 'src/app/services/detectors.service';
import { Action } from 'src/app/types/action.type';
import { Detector } from 'src/app/types/detector.type';
import { MinMaxDetector } from 'src/app/types/minMaxDetector.type';
import { SlidingWindowDetector } from 'src/app/types/slidingWindowDetector.type';

@Component({
  selector: 'aaas-detector-details',
  templateUrl: './detector-details.component.html',
  styleUrls: ['./detector-details.component.scss']
})
export class DetectorDetailsComponent implements OnInit {

  myForm!: FormGroup;
  private create: boolean = false;
  actions$: Observable<Action[]> = this.actionsService.getAll();
  detector: Detector | MinMaxDetector | SlidingWindowDetector = {
    id: 0,
    action: undefined,
    telemetryName: '',
    checkInterval: 0,
    isRunning: false,
    typeName: undefined
  };

  constructor(
    private detectorsService: DetectorsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private actionsService: ActionsService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.params['id']
    const id = Number(param);
    this.initForm();
    if (id && !isNaN(id)) {
      this.detectorsService.getById(id).subscribe(x => {
        this.detector = x;
        this.create = false;
        this.initForm();
      });
    } else {
      if (param === 'MinMaxDetector') {
        this.detector = {
          typeName: 'MinMaxDetector',
          id: 0,
          action: undefined,
          checkInterval: 0,
          isRunning: false,
          max: 0,
          min: 0,
          maxOccurs: 0,
          telemetryName: '',
          timeWindow: 0
        }
      }
      else if (param.endsWith('SlidingWindowDetector')) {
        this.detector = {
          typeName: param,
          id: 0,
          action: undefined,
          checkInterval: 0,
          isRunning: false,
          timeWindow: 0,
          useGreater: false,
          telemetryName: '',
          threshold: 0
        }
      }
      else {
        this.router.navigateByUrl('');
      }
      this.create = true;
      this.initForm();
    }
  }

  initForm() {
    let formOptions: any = {
      telemetryName: [this.detector.telemetryName, { validators: [Validators.required] }],
      id: [this.detector.id],
      typeName: [this.detector.typeName],
      checkInterval: [this.detector.checkInterval, { validators: [Validators.required, Validators.min(500)] }],
      isRunning: [this.detector.isRunning],
      action: [this.detector.action, { validators: [Validators.required] }]
    };

    if (this.detector.typeName === 'MinMaxDetector') {
      const minMaxDetector = this.detector as MinMaxDetector;
      formOptions.min = [minMaxDetector.min, { validators: [Validators.required] }];
      formOptions.max = [minMaxDetector.max, { validators: [Validators.required] }];
      formOptions.timeWindow = [minMaxDetector.timeWindow, { validators: [Validators.required, Validators.min(1000)] }];
      formOptions.maxOccurs = [minMaxDetector.maxOccurs, { validators: [Validators.required] }];
    }
    else if (this.detector.typeName?.endsWith('SlidingWindowDetector')) {
      const slidingWindowDetector = this.detector as SlidingWindowDetector;
      formOptions.timeWindow = [slidingWindowDetector.timeWindow, { validators: [Validators.required, Validators.min(1000)] }];
      formOptions.useGreater = [slidingWindowDetector.useGreater, { validators: [Validators.required] }];
      formOptions.threshold = [slidingWindowDetector.threshold, { validators: [Validators.required] }];
    }
    this.myForm = this.fb.group(formOptions);
  }

  submitForm() {
    const detector = this.myForm.value;
    if (this.create) {
      this.detectorsService.save(detector);
    } else {
      this.detectorsService.update(detector)?.subscribe(() => this.router.navigate(['/detectors']));
    }
  }

  actionComparer(a1: Action, a2: Action){
    return a1.id === a2.id;
  }
}
