import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetailComponent } from './artist-detail.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../contentful/contentful.service';
import { Entry, EntryCollection } from 'contentful';
import { Artist } from './artist';

describe('ArtistDetailComponent', () => {
  let component: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistDetailComponent ],
      providers: [ { 
        provide: Router, 
        useClass: class { navigate = jasmine.createSpy("navigate"); }
      }] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
