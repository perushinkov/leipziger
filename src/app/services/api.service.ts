import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { Album } from '../model/album';
import { Photo } from '../model/photo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + 'users');
  }

  // TODO: This is currently called after this album has already been fetched.
  //  Consider some sort of caching?
  getAlbum(albumId: number): Observable<Album> {
    if (albumId === null) {
      throw new Error('Invalid album id');
    }

    return this.httpClient.get<Album[]>(
      environment.apiUrl + 'albums',
      {params: {id: String(albumId)}}
    ).pipe(map((albums: Album[]) => albums[0]));
  }

  getAlbums(userId: number): Observable<Album[]> {
    if (userId === null) {
      throw new Error('Invalid user id');
    }
    return this.httpClient.get<Album[]>(
      environment.apiUrl + 'albums',
      {params: {userId: String(userId)}}
      );
  }

  getPhotos(albumId: number): Observable<Photo[]> {
    if (albumId === null) {
      throw new Error('Invalid album id');
    }
    return this.httpClient.get<Photo[]>(
      environment.apiUrl + 'photos',
      {params: {albumId: String(albumId)}}
    );
  }
}
