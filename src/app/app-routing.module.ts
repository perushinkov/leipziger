import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserAlbumsComponent } from './users/user-albums/user-albums.component';
import { AlbumsViewerComponent } from './users/user-albums/albums-viewer/albums-viewer.component';
import { AlbumEditComponent } from './users/user-albums/album-edit/album-edit.component';
import { NoUserSelectedComponent } from './users/no-user-selected/no-user-selected.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NoUserSelectedComponent
      },
      {
        path: ':id',
        component: UserAlbumsComponent,
        children: [
          {
            path: 'browse',
            component: AlbumsViewerComponent
          },
          {
            path: 'edit',
            children: [
              {
                path: ':id',
                component: AlbumEditComponent
              }
            ]
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
