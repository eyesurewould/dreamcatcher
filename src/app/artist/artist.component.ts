import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../shared/contentful.service';
import { Entry, EntryCollection } from 'contentful';
import { Artist } from '../artist/artist';
import { emailValidator } from '../shared/validation';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  public id: string;
  public artist: Entry<any>;
  public clients: EntryCollection<any>;
  public clientCount = 0;

  artistDetailFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  public isEditable: boolean = false;

  constructor(private cs: ContentfulService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.load(this.id);

  }

  ngOnChanges() {
    this.load(this.id);

  }

  /**
     * Load an Artist entry, then get the clients for the artist
     * 
     * @param id A Contentful Entry id
     */
  load(id: string) {

    this.cs.getClient(id)
      .then((responseClient) => {
        this.artist = responseClient;

        this.artistDetailFormGroup.controls['email'].setValue(this.artist.fields.email);

        if (this.artist.fields.firstName != undefined) {
          this.artistDetailFormGroup.controls['firstName'].setValue(this.artist.fields.firstName);
        }
        if (this.artist.fields.lastName != undefined) {
          this.artistDetailFormGroup.controls['lastName'].setValue(this.artist.fields.lastName);
        }
        //if (this.artist.fields.firebaseId != undefined) {
        //    this.artistDetailFormGroup.controls['firebaseId'].setValue(this.artist.fields.firebaseId);
        //}

        this.cs.getClientsForArtist(id)
          .then((responseClients) => {
            this.clients = responseClients;
            console.log('load: clients count ', responseClients.items.length);
            this.clientCount = responseClients.items.length;

          })
      })
      .catch((err) => {
        console.error;
      })

  }

  enableEditing() {
    //console.log('enableEditing: start ', this.clientDetailFormGroup);
    this.isEditable = true;
  }

  disableEditing() {
    //console.log('disableEditing: start');
    this.isEditable = false;
  }


  /**
   * Save current edits back to Contentful via the service
   */
  submit() {
    //console.log('submit: start');
    this.isEditable = false;

    var artist = new Artist();
    artist.email = this.artistDetailFormGroup.controls['email'].value;
    artist.firstName = this.artistDetailFormGroup.controls['firstName'].value;
    artist.lastName = this.artistDetailFormGroup.controls['lastName'].value;

    //console.log('submit: artist data to send ', artist);
    this.cs.saveArtist(this.id, artist)
      .then((entry) => {
        //console.log('submit: saved ', entry);
      })
      .catch((err) => {
        console.error;
      })

  }


  /**
   * Delete a Contentful Entry
   * 
   * @param id A Contentful Entry id
   */
  deleteArtist(id: string) {
    //console.log('deleteArtist: ', id);
    this.cs.deleteArtist(id)
      .then(() => {
        //console.log('deleteArtist: deleted ', id);
        this.router.navigate(['/artists']);
      })
      .catch((err) => {
        console.error;
      })
  }


}
