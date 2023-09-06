import { APP_CONFIG } from 'src/environments/config';
import { DbService } from './services/db/db.service';
import { EventsService } from 'src/app/services/events/events.service';

import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  PREFIX = '';
  TITLE = `${this.PREFIX}AppComponent`;

  APP_NAME = APP_CONFIG.APP_NAME;
  APP_VERSION = APP_CONFIG.APP_VERSION;
  APP_AUTHOR = APP_CONFIG.APP_AUTHOR;
  HOME_PAGE = APP_CONFIG.HOME_PAGE;
  HOME_DIR = APP_CONFIG.HOME_DIR;
  THEME = APP_CONFIG.DEFAULT_THEME;
  PREFIXES = APP_CONFIG.PREFIXES;

  CURRENT_URL = APP_CONFIG.HOME_PAGE;
  LAST_URL = APP_CONFIG.HOME_PAGE;
  DEV_MODE = false;

  isLoading = false;
  CSS_ROOT = document.documentElement;

  constructor(
    public db: DbService,
    public router: Router,
    public platform: Platform,
    private cdr: ChangeDetectorRef,
    public alertController: AlertController,
    private menu: MenuController,
    private events: EventsService,
    public loadingController: LoadingController
  ) {
    console.log(`[${this.TITLE}#constructor]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.TITLE}#ionViewDidEnter] READY`);

      this.events.subscribe('sync:finished', async (data) => {
        console.log(`[${this.TITLE}#constructor] EVENT = sync:finished`, data.time);
      });

      this.LAST_URL = await this.db.get('LAST_URL', this.TITLE);
      this.redirectTo(this.TITLE, this.HOME_PAGE);

      this.updateScreenSize();

      window.addEventListener('resize', async () => {
        console.log(`[${this.TITLE}#constructor] window.resize`);

        await this.updateScreenSize();
      });

      await this.updateCurrentUrl();

      this.updateView(this.TITLE);
    });
  }

  defaultOrder(): number { return 0; }

  updateView(from: string): void {
    console.log(`[${this.TITLE}#updateView] from`, from);
    this.cdr.detectChanges();
  }

  async updateCurrentUrl(): Promise<void> {
    this.CURRENT_URL = this.router.url.substring(1) == this.HOME_PAGE ? this.HOME_PAGE : this.router.url.substring(1).replace(/[^A-Za-z0-9]+/g, ' ');

    console.log(`[${this.TITLE}#updateCurrentUrl] CURRENT_URL (${this.CURRENT_URL})`);
    console.log(`[${this.TITLE}#updateCurrentUrl] router.url (${this.router.url})`);

    await this.db.set('LAST_URL', this.CURRENT_URL, this.TITLE);
  }

  updateScreenSize() {
    console.log(`[${this.TITLE}#updateScreenSize] CSS_ROOT`, this.CSS_ROOT);
    console.log(`[${this.TITLE}#updateScreenSize] CSS_ROOT.style`, this.CSS_ROOT.style);

    const screenWidth = Math.min(window.innerWidth, window.screen.width);
    console.log(`[${this.TITLE}#updateScreenSize] screenWidth`, screenWidth);

    const screenHeight = Math.min(window.innerHeight, window.screen.height);
    console.log(`[${this.TITLE}#updateScreenSize] screenHeight`, screenHeight);

    this.CSS_ROOT.style.setProperty('--screenWidth', `${screenWidth}px`);
    this.CSS_ROOT.style.setProperty('--screenHeight', `${screenHeight}px`);
  }

  async redirectTo(from: string, url: string): Promise<void> {
    console.log(`[${this.TITLE}#redirectTo] (${from})`, url);

    await this.router.navigateByUrl('/' + url.replace('/', ''));
    this.updateCurrentUrl();
  }

  openLink(url: string): void {
    console.log(`[${this.TITLE}#openLink] url`, url);

    window.open(url, '_system', 'location=yes');
  }

  async startLoading(msg: string = 'Carregando...'): Promise<void> {
    console.log(`[${this.TITLE}#startLoading] isLoading`, this.isLoading, '| msg', msg);

    if (this.isLoading == true) return;

    this.isLoading = true;

    try {
      console.log(`[${this.TITLE}#startLoading] RUN (BEFORE) | isLoading`, this.isLoading);

      const loading = await this.loadingController.create({
        message: msg,
        duration: 0,
        id: 'loading'
      });

      await loading.present();

      console.log(`[${this.TITLE}#startLoading] RUN (AFTER) | isLoading`, this.isLoading);

      this.updateView(this.TITLE);
    } catch (error) {
      console.log(`[${this.TITLE}#startLoading] ERROR | isLoading`, this.isLoading, error);

      this.isLoading = false;
    }
  }

  async stopLoading(): Promise<void> {
    console.log(`[${this.TITLE}#stopLoading] isLoading`, this.isLoading);

    if (this.isLoading == false) return;

    this.isLoading = false;

    try {
      console.log(`[${this.TITLE}#stopLoading] RUN (BEFORE) | isLoading`, this.isLoading);

      await this.loadingController.dismiss('loading');

      console.log(`[${this.TITLE}#stopLoading] RUN (AFTER) | isLoading`, this.isLoading);

      this.updateView(this.TITLE);
    } catch (error) {
      console.log(`[${this.TITLE}#stopLoading] ERROR | isLoading`, this.isLoading, error);

      this.isLoading = true;
    }
  }

  async showAlert(topic: string, msg: string): Promise<void> {
    console.log(`[${this.TITLE}#showAlert] topic`, topic);
    console.log(`[${this.TITLE}#showAlert] msg`, msg);

    const alert = await this.alertController.create({
      cssClass: 'alerts-fullscreen',
      header: topic,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`[${this.TITLE}#showAlert] role`, role);
  }

  toggleMenu(): void {
    console.log(`[${this.TITLE}#toggleMenu]`);
    this.menu.enable(true, 'menu');
    this.menu.toggle('menu');
  }

  async toggleTheme(): Promise<void> {
    console.log(`[${this.TITLE}#toggleTheme] (BEFORE) THEME`, this.THEME);

    if (this.THEME == 'dark') {
      this.THEME = 'light';
    } else {
      this.THEME = 'dark';
    }

    console.log(`[${this.TITLE}#toggleTheme] CSS_ROOT`, this.CSS_ROOT);
    console.log(`[${this.TITLE}#toggleTheme] CSS_ROOT.style`, this.CSS_ROOT.style);

    this.CSS_ROOT.style.setProperty('--screenTheme', this.THEME);
    await this.db.set('THEME', this.THEME, this.TITLE);

    console.log(`[${this.TITLE}#toggleTheme] (AFTER) THEME`, this.THEME);
  }
}
