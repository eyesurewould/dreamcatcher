import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
//import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
//import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { NavbarComponent } from './navbar/navbar.component';
//import { appRoutes } from '../routes';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      imports: [ 
        RouterTestingModule 
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ 
        RouterTestingModule 
      ]
    })
      .compileComponents();

  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Dreamcatcher'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Dreamcatcher');
  }));

});
