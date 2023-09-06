import { AppComponent } from 'src/app/app.component';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent  implements OnInit {
  PREFIX = '&';
  TITLE = `${this.PREFIX}TestComponent`;

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
