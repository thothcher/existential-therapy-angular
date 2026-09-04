import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Without this the router leaves the scroll position where it was, so a
    // link followed from halfway down a long page opened the next one already
    // scrolled. 'enabled' sends every forward navigation to the top and puts
    // back/forward returns where the reader left them; anchorScrolling honours
    // the [fragment] links that point into /givens.
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideClientHydration(withEventReplay())
  ]
};
