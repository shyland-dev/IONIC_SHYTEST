import { AppComponent } from 'src/app/app.component';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  PREFIX = '&';
  TITLE = `${this.PREFIX}SidemenuComponent`;

  ALL_PAGES: any = [];

  constructor(
    public app: AppComponent,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.TITLE}#constructor]`);
  }

  ngOnInit() {
    console.log(`[${this.TITLE}#ngOnInit]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.TITLE}#ngOnInit] READY`);

      const routerConfig = await this.app.router.config
        .filter((item: any) => {
          return item.path !== '' && item.path !== '**';
        })
        .map((item: any) => {
          return item.path
        });
      console.log(`[${this.TITLE}#ngOnInit] routerConfig`, routerConfig);

      this.ALL_PAGES = routerConfig;
      console.log(`[${this.TITLE}#ngOnInit] ALL_PAGES`, this.ALL_PAGES);

      this.updateView();
    });
  }

  defaultOrder() { return 0; }

  updateView() {
    console.log(`[${this.TITLE}#updateView]`);
    this.cdr.detectChanges();
    this.app.updateView(this.TITLE);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(this.TITLE, url);
  }
}
