import { AppComponent } from 'src/app/app.component';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  PREFIX = '$';
  TITLE = `${this.PREFIX}TestPage`;

  constructor(
    public app: AppComponent,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.TITLE}#constructor]`);
  }

  ngOnInit() {
    console.log(`[${this.TITLE}#ngOnInit]`);
  }

  ionViewDidEnter() {
    console.log(`[${this.TITLE}#ionViewDidEnter]`);

    this.platform.ready().then(async () => {
      console.log(`[${this.TITLE}#ionViewDidEnter] READY`);

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
