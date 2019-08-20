import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../../model/album';
import { combineLatest, of } from 'rxjs';
import { AlbumsExchangeService } from './albums-exchange.service';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.css'],
  providers: [AlbumsExchangeService] // provided here for scoping reasons
})
export class UserAlbumsComponent implements OnInit {

  albums: Album[] = [];
  viewing: boolean[] = [];
  editMode = false;
  faEdit = faEdit;
  faEye = faEye;
  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private albumsExchange: AlbumsExchangeService) {}

  ngOnInit() {
    const childUrlObservable = this.route.firstChild
      ? this.route.firstChild.url
      : of(null);
    const paramsObservable = this.route.params;

    combineLatest(childUrlObservable, paramsObservable)
      .subscribe(([childUrl, params]) => {
        this.api
          .getAlbums(parseInt(params.id, 10))
          .subscribe((albums: Album[]) => {
            this.albums = albums;
            this.viewing = albums.map(() => false);
            this.editMode = childUrl ? childUrl[0].path === 'edit' : false;
            if (!childUrl) {
              this.router.navigate(['browse'], {relativeTo: this.route});
            }
          });
      });
    this.albumsExchange.excludedExchange.subscribe(excludedId => {
      const index = this.albums.findIndex(album => album.id === excludedId);
      this.viewing[index] = false;
    });
    this.albumsExchange.receivedExchange.subscribe(receivedId => {
      const index = this.albums.findIndex(album => album.id === receivedId);
      this.viewing[index] = true;
    });
  }

  private editAlbum(albumIndex: number) {
    const albumId = albumIndex !== null ? this.albums[albumIndex].id : -1;
    this.router.navigate(['edit', albumId], {relativeTo: this.route});
    this.editMode = true;
  }

  private backToBrowsing() {
    this.router.navigate(['browse'], {relativeTo: this.route});
    this.editMode = false;
  }

  switchEditMode() {
    if (this.editMode) {
      this.backToBrowsing();
    } else {
      this.editAlbum(null);
    }
    this.viewing = this.albums.map(() => false);
  }

  attachAlbumToEvent($event: DragEvent, album: Album) {
    $event.dataTransfer.setData('text', 'album:' + JSON.stringify(album));
  }
}
