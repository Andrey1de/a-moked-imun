import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SiteWatchesComponent } from './ui/site-watches/site-watches.component';
import { HomeComponent } from './ui/home/home.component';
import { FormsModule } from '@angular/forms';
import { LaunchComponent } from './ui/launch/launch.component';
import { SettingsComponent } from './ui/settings/settings.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'launch', component: LaunchComponent },
  { path: 'site-watches', component: SiteWatchesComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' }, //
];
@NgModule({
  declarations: [
    AppComponent,
    SiteWatchesComponent,
    HomeComponent,
    LaunchComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
