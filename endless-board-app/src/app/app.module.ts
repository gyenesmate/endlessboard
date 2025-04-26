import { NgModule, isDevMode } from '@angular/core';
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
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(indexDBConfig),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,//!isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

