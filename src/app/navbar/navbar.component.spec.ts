import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { By }              from '@angular/platform-browser';
 
import { HttpClientModule }    from '@angular/common/http';

describe('NavbarComponent', () => {
 
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let element: HTMLElement;
   
  beforeEach(()=> {
    
    TestBed.configureTestingModule({
        declarations: [ NavbarComponent ],
        imports: [ HttpClientModule], 
    });
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.navbar'));
    element  = de.nativeElement;
 
  });

  it('should have a Component',()=> {
    expect(comp).toBeTruthy();
  });

  it('should have links for client and project navigation', () => {
    expect(element.innerHTML).toContain("/clients");
    expect(element.innerHTML).toContain("/projects");
  })
  
})