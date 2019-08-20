import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import SpyObj = jasmine.SpyObj;
import { Observable, of} from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Album } from '../model/album';
import { Photo } from '../model/photo';

describe('ApiService', () => {
  let componentUnderTest: ApiService;
  let httpClient: SpyObj<HttpClient>;

  Given(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
  });

  describe('INIT', () => {
    When(() => {
      componentUnderTest = new ApiService(httpClient);
    });
    Then('should be created', () => {
      expect(componentUnderTest).toBeTruthy();
    });
  });

  Given(() => {
    componentUnderTest = new ApiService(httpClient);
  });

  describe('METHOD: getUsers', () => {
    let dummyUsers: User[];
    let subscription: Observable<User[]>;
    Given(() => {
      dummyUsers = [
        {id: 1, name: 'Alexander Graham', email: 'algra@email.com', username: 'alexa99'},
        {id: 2, name: 'Misha Grigorov', email: 'misha@russianMail.com', username: 'misha75'}
      ];
    });

    When(() => {
      subscription = componentUnderTest.getUsers();
    });

    describe('If users are returned', () => {
      Given(() => {
        httpClient.get.and.returnValue(of(dummyUsers));
      });

      Then('Should be called with correct url', (done) => {
        subscription.subscribe((users: User[]) => {
          expect(httpClient.get).toHaveBeenCalledWith(environment.apiUrl + 'users');
          done();
        });
      });
      Then('Should return expected users', (done) => {
        subscription.subscribe((users: User[]) => {
          expect(users).toEqual(dummyUsers);
          done();
        });
      });
    });
  });

  describe('METHOD: getAlbums', () => {
    let dummyAlbums: Album[];
    let subscription: Observable<Album[]>;
    let paramUserId: number;
    let error: Error;

    Given(() => {
      error = null;
      dummyAlbums = [
        {
          userId: 7,
          id: 1,
          title: 'delectus iusto et'
        },
        {
          userId: 7,
          id: 2,
          title: 'eos ea non recusandae iste ut quasi'
        },
        {
          userId: 7,
          id: 3,
          title: 'velit est quam'
        }];
    });

    When(() => {
      try {
        subscription = componentUnderTest.getAlbums(paramUserId);
      } catch (e) {
        error = e;
      }
    });

    describe('Throw if paramUserId is null', () => {
      Given(() => {
        paramUserId = null;
      });
      Then(() => {
        expect(error).toBeTruthy();
      });
    });

    describe('If albums are returned', () => {
      Given(() => {
        paramUserId = 7;
        httpClient.get.and.returnValue(of(dummyAlbums));
      });

      Then('Should be called with correct url', (done) => {
        subscription.subscribe((albums: Album[]) => {
          expect(httpClient.get).toHaveBeenCalledWith(environment.apiUrl + 'albums', {params: {userId: '' + paramUserId}});
          done();
        });
      });
      Then('Should return expected albums', (done) => {
        subscription.subscribe((albums: Album[]) => {
          expect(albums).toEqual(dummyAlbums);
          done();
        });
      });
    });
  });

  describe('METHOD: getPhotos', () => {
    let dummyPhotos: Photo[];
    let subscription: Observable<Photo[]>;
    let paramAlbumId: number;
    let error: Error;

    Given(() => {
      error = null;
      dummyPhotos = [
        {
          albumId: 3,
          id: 101,
          title: 'incidunt alias vel enim',
          url: 'https://via.placeholder.com/600/e743b',
          thumbnailUrl: 'https://via.placeholder.com/150/e743b'
        },
        {
          albumId: 3,
          id: 102,
          title: 'eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt',
          url: 'https://via.placeholder.com/600/a393af',
          thumbnailUrl: 'https://via.placeholder.com/150/a393af'
        },
        {
          albumId: 3,
          id: 103,
          title: 'et eius nisi in ut reprehenderit labore eum',
          url: 'https://via.placeholder.com/600/35cedf',
          thumbnailUrl: 'https://via.placeholder.com/150/35cedf'
        }
      ];
    });

    When(() => {
      try {
        subscription = componentUnderTest.getPhotos(paramAlbumId);
      } catch (e) {
        error = e;
      }
    });

    describe('Throw if paramAlbumId is null', () => {
      Given(() => {
        paramAlbumId = null;
      });
      Then(() => {
        expect(error).toBeTruthy();
      });
    });

    describe('If photos are returned', () => {
      Given(() => {
        paramAlbumId = 7;
        httpClient.get.and.returnValue(of(dummyPhotos));
      });

      Then('Should be called with correct url', (done) => {
        subscription.subscribe((photos: Photo[]) => {
          expect(httpClient.get).toHaveBeenCalledWith(environment.apiUrl + 'photos', {params: {albumId: '' + paramAlbumId}});
          done();
        });
      });
      Then('Should return expected photos', (done) => {
        subscription.subscribe((photos: Photo[]) => {
          expect(photos).toEqual(dummyPhotos);
          done();
        });
      });
    });
  });

});
