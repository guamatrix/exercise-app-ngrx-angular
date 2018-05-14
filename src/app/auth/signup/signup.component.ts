import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/UI.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate: Date;
  showSpinner$: Observable<boolean>;

  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.initForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.showSpinner$ = this.store.select(fromRoot.getIsLoading);
  }

  initForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] } ),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      born: new FormControl(null, { validators: [Validators.required] }),
      agree: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    const { email, password } = this.signupForm.value;
    this.authService.registredUser({ email, password });
  }
}
