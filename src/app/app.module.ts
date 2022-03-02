import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SiteWatchesComponent } from './ui/site-watches/site-watches.component';
import { HomeComponent } from './ui/home/home.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'site-watches', component: SiteWatchesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } //
];
@NgModule({
  declarations: [
    AppComponent,
    SiteWatchesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
