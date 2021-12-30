import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';
import { Action } from 'src/app/types/action.type';
import { MailAction } from 'src/app/types/mailAction.type';
import { WebHookAction } from 'src/app/types/webHookAction.type';

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {
  myForm!: FormGroup;
  action: Action | MailAction | WebHookAction = { id: 0, name: '', typeName: undefined };
  create: boolean = false;

  constructor(private fb: FormBuilder, private actionsService: ActionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const param = this.route.snapshot.params['id']
    const id = Number(param);
    this.initForm();
    if (id && !isNaN(id)) {
      this.actionsService.getById(id).subscribe(x => {
        this.action = x;
        this.create = false;
        this.initForm();
      });
    } else {
      if (param === 'MailAction') {
        this.action = {
          typeName: 'MailAction',
          id: 0,
          name: 'New Mail Action',
          mailAddress: '',
          mailContent: ''
        }
      } else if (param === 'WebHookAction') {
        this.action = {
          typeName: 'WebHookAction',
          id: 0,
          name: "New Web Hook Actoin",
          requestUrl: ''
        }
      } else {
        this.router.navigateByUrl('');
      }
      this.create = true;
      this.initForm();
    }
  }

  initForm() {
    let formOptions: any = {
      name: [this.action.name, { validators: [Validators.required] }],
      id: [this.action.id],
      typeName: [this.action.typeName]
    };

    if (this.action.typeName === "MailAction") {
      const mailAction = this.action as MailAction;
      formOptions.mailAddress = [mailAction.mailAddress, { validators: [Validators.required, Validators.email] }];
      formOptions.mailContent = [mailAction.mailContent, { validators: [Validators.required] }];
    }
    else if (this.action.typeName === "WebHookAction") {
      const webHookAction = this.action as WebHookAction;
      formOptions.requestUrl = [webHookAction.requestUrl, { validators: [Validators.required, Validators.pattern(/^(?:https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]+\.[a-zA-Z0-9()]+\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)] }];
    }
    this.myForm = this.fb.group(formOptions);
  }

  submitForm() {
    const action = this.myForm.value;
    if (this.create) {
      this.actionsService.save(action);
    } else {
      this.actionsService.update(action)?.subscribe(() => this.router.navigate(['/actions']));
    }
  }

}
