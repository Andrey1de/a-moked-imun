import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SiteWatchesComponent } from './ui/site-watches/site-watches.component';
import { HomeComponent } from './ui/home/home.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'site-watches', component: SiteWatchesComponent },
  { path: '', redirectTo: '/site-watches', pathMatch: 'full' }, //
];
@NgModule({
  declarations: [
    AppComponent,
     SiteWatchesComponent,
    HomeComponent
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
