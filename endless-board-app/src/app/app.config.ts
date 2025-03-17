import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "endless-board-app", appId: "1:522646402728:web:5f2cf592fa9c6a9ccdb49d", storageBucket: "endless-board-app.firebasestorage.app", apiKey: "AIzaSyAi22e5LIt7ATnnok1M1VCji8BHEZr47v4", authDomain: "endless-board-app.firebaseapp.com", messagingSenderId: "522646402728", measurementId: "G-6GFFCFNB9V" })), provideFirestore(() => getFirestore())]
};
