import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { ClientDetailComponent } from './client-detail.component';
import { Router } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';

import { ActivatedRoute } from '@angular/router';
//import { ActivatedRouteStub } from '../../testing/activated-route-stub';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  let cs: ContentfulService;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //imports: [ReactiveFormsModule],
      declarations: [ ClientDetailComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (id) => '6ju75Q1JcI2EOC0QMiuOo6'}),
          },
        }
      ]
    });

    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    //de = fixture.debugElement.query(By.css('#projects-container'));
    //element = de.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*
  it('#enableEditing() should toggle #isEditable', () => {
    expect(component.isEditable).toBe(false, 'off at first');
    component.enableEditing();
    expect(component.isEditable).toBe(true, 'on after click');
  });
  */
});