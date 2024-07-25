import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-b2bb6","appId":"1:764357856797:web:3783b4a793c922d38980f4","storageBucket":"danotes-b2bb6.appspot.com","apiKey":"AIzaSyCDFifN1lM4cXMkDhlgdBS-myegtibVXCc","authDomain":"danotes-b2bb6.firebaseapp.com","messagingSenderId":"764357856797"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
