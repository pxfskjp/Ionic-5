import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ReAuthGuard } from './guard/re-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'chat-room', loadChildren: './pages/chat-room/chat-room.module#ChatRoomPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [ReAuthGuard]},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [ReAuthGuard]},
  { path: 'modal-newchat', loadChildren: './pages/modal-newchat/modal-newchat.module#ModalNewchatPageModule', canActivate: [ReAuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
