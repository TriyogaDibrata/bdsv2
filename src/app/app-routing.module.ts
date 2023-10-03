import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { SignedInGuard } from '@guards/signed-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
    canActivate: [SignedInGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [SignedInGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'new-doc',
    loadChildren: () =>
      import('./pages/new-doc/new-doc.module').then((m) => m.NewDocPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'signed-doc',
    loadChildren: () =>
      import('./pages/signed-doc/signed-doc.module').then(
        (m) => m.SignedDocPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'inbox',
    loadChildren: () =>
      import('./pages/inbox/inbox.module').then((m) => m.InboxPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sent',
    loadChildren: () =>
      import('./pages/sent/sent.module').then((m) => m.SentPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'agenda',
    loadChildren: () =>
      import('./pages/agenda/agenda.module').then((m) => m.AgendaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-doc/:id',
    loadChildren: () =>
      import('./pages/detail-doc/detail-doc.module').then(
        (m) => m.DetailDocPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-mail/:id/:inbox_id',
    loadChildren: () =>
      import('./pages/detail-mail/detail-mail.module').then(
        (m) => m.DetailMailPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'barcode-scanner',
    loadChildren: () =>
      import('./pages/barcode-scanner/barcode-scanner.module').then(
        (m) => m.BarcodeScannerPageModule,
      ),
  },
  {
    path: 'update-password',
    loadChildren: () =>
      import('./pages/update-password/update-password.module').then(
        (m) => m.UpdatePasswordPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'update-passphrase',
    loadChildren: () =>
      import('./pages/update-passphrase/update-passphrase.module').then(
        (m) => m.UpdatePassphrasePageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'update-profile',
    loadChildren: () =>
      import('./pages/update-profile/update-profile.module').then(
        (m) => m.UpdateProfilePageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'about-app',
    loadChildren: () => import('./pages/about-app/about-app.module').then( m => m.AboutAppPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
