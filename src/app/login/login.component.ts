import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(
    private  authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    console.log('call authService');
    this.authService.doLogin(value)
    .then(res => {
      console.log('authService did its thing');
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  ngOnInit() {
  }

}
