import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { supportDocument } from 'ack-angular-fx/web-animations.min';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// animation polyfill by ack-angular-fx
supportDocument(document);

platformBrowserDynamic().bootstrapModule(AppModule);
