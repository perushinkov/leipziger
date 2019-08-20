import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserAlbumsComponent } from './users/user-albums/user-albums.component';
import { AlbumsViewerComponent } from './users/user-albums/albums-viewer/albums-viewer.component';
import { AppRoutingModule } from './app-routing.module';
import { AlbumEditComponent } from './users/user-albums/album-edit/album-edit.component';
import { NoUserSelectedComponent } from './users/no-user-selected/no-user-selected.component';
import { ChipComponent } from './common/chip/chip.component';
import { PhotoCellComponent } from './users/user-albums/albums-viewer/photo-cell/photo-cell.component';
import { PaginationComponent } from './common/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserAlbumsComponent,
    AlbumsViewerComponent,
    AlbumEditComponent,
    NoUserSelectedComponent,
    ChipComponent,
    PhotoCellComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
