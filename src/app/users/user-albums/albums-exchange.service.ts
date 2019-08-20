import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
/**
 * albumViewer component now informs the userAlbums component,
 * when it has loaded or unloaded an album.
 */
export class AlbumsExchangeService {
  receivedExchange = new EventEmitter<number>();
  excludedExchange = new EventEmitter<number>();

  received(id: number) {
    this.receivedExchange.emit(id);
  }
  excluded(id: number) {
    this.excludedExchange.emit(id);
  }
}
