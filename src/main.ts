import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Add withFetch
import 'zone.js'; // ✅ Required for Angular's change detection

import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()) // ✅ Enables Fetch API for better SSR support
  ]
});
