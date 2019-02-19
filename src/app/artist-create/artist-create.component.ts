import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentfulService } from '../shared/contentful.service';
import { Artist } from '../artist/artist';
import { emailValidator, phoneValidator } from '../shared/validation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent {

  public artist: Artist;
  
  //TODO: RegEx patterns are from Contentful. They are NOT great
  //Patterns are duplicated here and in the ClientComponent, so
  //re-factor to a shared loaction to remove duplication.
  //Consider making them part of configuration for easy adjustment.
  artistFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(private cs: ContentfulService, private router: Router) {
    this.artist = new Artist();

  }

  submit() {

    this.artist.email = this.artistFormGroup.controls['email'].value;

    if (this.artistFormGroup.controls['firstName'].value !== '') {
      this.artist.firstName = this.artistFormGroup.controls['firstName'].value;
    }
    if (this.artistFormGroup.controls['lastName'].value !== '') {
      this.artist.lastName = this.artistFormGroup.controls['lastName'].value;
    }
    
    //console.log('submit: artist data to send ', this.artist);
    this.cs.createArtist(this.artist)
      .then((response) => {
        this.router.navigate(['/artist', response.sys.id]);
      });
      
  }

}
