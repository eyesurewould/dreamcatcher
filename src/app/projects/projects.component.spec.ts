import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ContentfulService } from '../shared/contentful.service';
import { ProjectsComponent } from './projects.component';
import { By } from '@angular/platform-browser';

describe('ProjectsComponent', () => {

  let cs: ContentfulService;

  let comp: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent]
    })
      .compileComponents();

    cs = new ContentfulService();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent], 
      imports: [HttpModule],
    });
    fixture = TestBed.createComponent(ProjectsComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#projects-container'));
    element = de.nativeElement;

  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should have at least one project', () => {
    expect(element.hasChildNodes).toBeTruthy();
  })

});
