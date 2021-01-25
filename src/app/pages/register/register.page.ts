import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/custom-validators';
import { ApiService } from 'src/app/api/api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  hide: boolean = true;
  c_hide: boolean = true;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private plt: Platform) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required, 
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6) 
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required, 
      ])),
    },{
      validators: MustMatch('password', 'confirm_password')
    })
   }

  ngOnInit() {
  }

  register() {
    this.api.loader = true;
    this.api.signUp(this.registerForm.value['name'], this.registerForm.value['email'], this.registerForm.value['password']);
  }

}
