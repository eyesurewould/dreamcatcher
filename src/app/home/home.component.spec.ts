import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentfulService } from '../shared/contentful.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let native;

  let cs: ContentfulService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();

    cs = new ContentfulService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    native = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display more than 0 clients', () => {
    expect( fixture.nativeElement.querySelectorAll('.client-card').length).toBeGreaterThan(0); 
  });
  it('should display more than 0 projects', () => {
    expect( fixture.nativeElement.querySelectorAll('.project-card').length).toBeGreaterThan(0); 
  });
  

});
