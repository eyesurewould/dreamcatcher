import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ProjectDetailComponent } from './project-detail.component';
import { Router } from '@angular/router';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  let activatedRoute = new ActivatedRouteStub();

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    activatedRoute.setParamMap({ id: '32HyWGjCTYqyGgyOg4ICU8' }); //a project id

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ 
        ProjectDetailComponent 
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRouteStub, useValue: {
            params: of({ id: '32HyWGjCTYqyGgyOg4ICU8' })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/** 
 * Need to add tests
 * 1) read mode - show project details
 * 2) edit mode - show required field and 'save' button
 */

});