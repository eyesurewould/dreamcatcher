import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ProjectCreateComponent } from './project-create.component';
import { Router } from '@angular/router';

import { ActivatedRouteStub } from '../../testing/activated-route-stub';

describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;

  let activatedRoute = new ActivatedRouteStub();

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    activatedRoute.setParamMap({ id: '6ju75Q1JcI2EOC0QMiuOo6' }); //a client id

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProjectCreateComponent ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRouteStub, useValue: {
            params: of({ id: '6ju75Q1JcI2EOC0QMiuOo6' })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
