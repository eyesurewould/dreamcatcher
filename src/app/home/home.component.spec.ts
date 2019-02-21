import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentfulService } from '../contentful/contentful.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let native;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        HttpClientTestingModule, 
        HttpClientModule
      ],
      providers: [
        ContentfulService
      ]
    })
      .compileComponents();

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

  it('should display more than 0 client-card elements', () => {
    expect( native.querySelectorAll('.client-card').length).toBeGreaterThan(0); 
  });

  it('should display more than 0 project-card elements', () => {
    expect( native.querySelectorAll('.project-card').length).toBeGreaterThan(0); 
  });
  

});
