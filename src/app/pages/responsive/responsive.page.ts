import { AppComponent } from 'src/app/app.component';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.page.html',
  styleUrls: ['./responsive.page.scss'],
})
export class ResponsivePage implements OnInit {
  PREFIX = '$';
  TITLE = `${this.PREFIX}ResponsivePage`;

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

      this.CSSDebug();

      window.addEventListener('resize', () => {
        console.log(`[${this.TITLE}#ionViewDidEnter] window.resize`);

        this.CSSDebug();
      });

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

  CSSDebug() {
    const responsiveElement = document.getElementById('CSS-responsive');
    console.log(`[${this.TITLE}#CSSDebug] responsiveElement`, responsiveElement);

    if (!responsiveElement) return;

    const computedStyle = window.getComputedStyle(responsiveElement);
    console.log(`[${this.TITLE}#CSSDebug] computedStyle`, computedStyle);

    const elementFontSize = computedStyle.getPropertyValue('font-size');
    console.log(`[${this.TITLE}#CSSDebug] elementFontSize`, elementFontSize);

    const elementOrientation = computedStyle.getPropertyValue('--screenOrientation');
    console.log(`[${this.TITLE}#CSSDebug] elementOrientation`, elementOrientation);

    const elementScreenWidth = computedStyle.getPropertyValue('--screenWidth');
    console.log(`[${this.TITLE}#CSSDebug] elementScreenWidth`, elementScreenWidth);

    const elementScreenHeight = computedStyle.getPropertyValue('--screenHeight');
    console.log(`[${this.TITLE}#CSSDebug] elementScreenHeight`, elementScreenHeight);

    const elementResponsiveUnit = computedStyle.getPropertyValue('--responsiveUnit');
    console.log(`[${this.TITLE}#CSSDebug] elementResponsiveUnit`, elementResponsiveUnit);

    const debugElement = document.getElementById('CSS-debug');
    console.log(`[${this.TITLE}#CSSDebug] debugElement`, debugElement);

    if (!debugElement) return;

    debugElement.innerHTML = `[${elementScreenWidth}, ${elementScreenHeight}] - ${elementOrientation} (${elementResponsiveUnit}) <b>${elementFontSize}</b>`;
  }
}
