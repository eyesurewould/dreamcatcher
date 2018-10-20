import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { ClientDetailComponent } from './client-detail.component';
import { Router } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';

import { ActivatedRoute } from '@angular/router';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  let cs: ContentfulService;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Need tests for 
   * 1) load at least one project record (or 'No projects yet')
   * 2) show 'Add Project' button
   */


});