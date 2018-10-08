import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { By }              from '@angular/platform-browser';
 
import { HttpModule }    from '@angular/http';

describe('NavbarComponent', () => {
 
//Typescript declarations.
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  //let mockNav: NavbarComponent[];
 
  // beforeEach is called once before every `it` block in a test.
  // Use this to configure to the component, inject services etc.
   
  beforeEach(()=> {
    
    TestBed.configureTestingModule({
        declarations: [ NavbarComponent ], // declare the test component
        imports: [ HttpModule], 
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