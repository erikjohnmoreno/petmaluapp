import { Injectable } from '@angular/core';

import { AppComponent } from './app.component';

@Injectable()
export class HelperService {
  constructor() {
    AppComponent.returned.next(localStorage.getItem("token"));
  }
}
