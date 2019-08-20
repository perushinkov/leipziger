import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../../model/album';
import { Photo } from '../../../model/photo';
import { ApiService } from '../../../services/api.service';
import { AlbumsExchangeService } from '../albums-exchange.service';

@Component({
  selector: 'app-albums-viewer',
  templateUrl: './albums-viewer.component.html',
  styleUrls: ['./albums-viewer.component.css']
})
export class AlbumsViewerComponent implements OnInit {

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private albumsExchange: AlbumsExchangeService) { }

  albums: Album[] = [];
  photos: Photo[] = [];

  pager = {
    currentPage: 0,
    // The following vars are for now const!
    entriesPerPage: 10,
    thumbnailSize: 120,
    cols: Array(5).fill(null),
    rows: Array(2).fill(null),
  };
  // TODO: Fetch Photos container as a View child, and calculate from its size what free space we have
  //  for a gallery, then use a simple linear function with cutoff to determine the optimal arrangement
  // Since time is running low though, I'll be hardcoding the numbers.
  ngOnInit() {
    this.route.parent.url.subscribe(newUrl => {
      this.albums.length = 0;
      this.photos.length = 0;
    })
  }


  onDragover($event: DragEvent) {
    $event.preventDefault();
  }

  drop($event: DragEvent) {
    const dragData = $event.dataTransfer.getData('text');
    if (dragData.startsWith('album:')) {
      const incomingAlbum: Album = JSON.parse(dragData.substring('album:'.length));
      $event.preventDefault();
      if (this.albums.findIndex(album => album.id === incomingAlbum.id) === -1) {
        this.albums.push(incomingAlbum);
        this.albumsExchange.received(incomingAlbum.id);
        this.api.getPhotos(incomingAlbum.id).subscribe(photos => {
          this.photos.push(...photos);
        });
      }
    }
  }

  removeAlbum(albumIndex: number) {
    const removedAlbum = this.albums.splice(albumIndex, 1)[0];
    this.photos = this.photos.filter(photo => photo.albumId !== removedAlbum.id);
    this.albumsExchange.excluded(removedAlbum.id);
  }

  getPhoto(rowIndex: number, colIndex: number): Photo {
    const lowerBound = this.pager.currentPage * this.pager.entriesPerPage;
    const offset = rowIndex * this.pager.cols.length + colIndex;
    if (this.photos.length > lowerBound + offset) {
      return this.photos[lowerBound + offset];
    }
    return null;
  }

  turnToPage(pageNumber: number) {
    this.pager.currentPage = pageNumber;
  }

  getPageCount() {
    return Math.abs(this.photos.length / this.pager.entriesPerPage);
  }
}
