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

  it('should contain multiple divs', () => {
    expect( native.querySelectorAll("div.clients_box > div").length).toBeGreaterThan(0); 
  });

  //FAILS currently - the DOM elements are still in flux, so this will be resolved once
  //the ClientsComponent is complete
  it('should display more than 0 clients', () => {
    console.log(native);
    expect( native.querySelectorAll('.client-card').length).toBeGreaterThan(0); 
  });

  //FAILS currently - the DOM elements are still in flux, so this will be resolved once
  //the ProjectsComponent is complete
  it('should display more than 0 projects', () => {
    expect( native.querySelectorAll('.project-card').length).toBeGreaterThan(0); 
  });
  

});
