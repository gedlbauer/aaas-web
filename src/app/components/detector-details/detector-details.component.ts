import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DetectorsService } from 'src/app/services/detectors.service';
import { Detector } from 'src/app/types/detector.type';

@Component({
  selector: 'app-detector-details',
  templateUrl: './detector-details.component.html',
  styleUrls: ['./detector-details.component.scss']
})
export class DetectorDetailsComponent implements OnInit {

  myForm!: FormGroup;
  private create: boolean = false;
  detector?: Detector;

  constructor(private detectorsService: DetectorsService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    const detector = this.myForm.value;
    if (this.create) {
      this.detectorsService.save(detector);
    } else {
      this.detectorsService.update(detector)?.subscribe(() => this.router.navigate(['/detectors']));
    }
  }
}
