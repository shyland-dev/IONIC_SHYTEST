import { APP_CONFIG } from 'src/environments/config';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  PREFIX = '@';
  TITLE = `${this.PREFIX}DbService`;

  DB_VERSION = '';
  DB_NAME = '';

  constructor() {
    console.log(`[${this.TITLE}#constructor]`);

    this.setupDb();
  }

  setupDb(): void {
    console.log(`[${this.TITLE}#setupDb]`);

    this.DB_VERSION = APP_CONFIG.APP_VERSION.replace(/[^0-9]/g, '');
    console.log(`[${this.TITLE}#setupDb] DB_VERSION`, this.DB_VERSION);

    this.DB_NAME = APP_CONFIG.DB_NAME;
    console.log(`[${this.TITLE}#setupDb] DB_NAME`, this.DB_NAME);
  }

  get(varname: string, from: string = ''): any {
    const output = JSON.parse(localStorage.getItem(varname) || 'null');
    console.log(`[${this.TITLE}#get] (${from}) varname: ${varname} | output:`, output);
    return output;
  }

  set(varname: string, value: any, from: string = ''): void {
    console.log(`[${this.TITLE}#set] (${from}) varname: ${varname} | value:`, value);
    localStorage.setItem(varname, JSON.stringify(value));
  }
}
