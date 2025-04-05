import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './app/indexeddb.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)), // Register IndexedDB
  ],
}).catch((err) => console.error(err));
