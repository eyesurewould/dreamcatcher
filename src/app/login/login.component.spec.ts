import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import { Component, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class MockAuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: MockAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ LoginComponent ],
      providers: [ Router ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    let component = fixture.componentInstance;
    let navigateSpy = spyOn(router, 'navigate');

    //component.tryLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
});
});
