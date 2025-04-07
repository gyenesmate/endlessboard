import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { indexDBConfig } from './indexeddb.config';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat'
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(indexDBConfig),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

