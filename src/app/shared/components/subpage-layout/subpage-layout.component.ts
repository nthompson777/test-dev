import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { fadeAnimation } from '../../animations/animations';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-subpage-layout',
  templateUrl: './subpage-layout.component.html',
  animations: [fadeAnimation]
})

export class SubpageLayoutComponent {
  @ViewChild('main') main: ElementRef;

  constructor(
    private renderer: Renderer,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {}

  skipLink() {
    this.renderer.invokeElementMethod(this.main.nativeElement, 'focus');
  }

  // Scroll To Top When Route Changes
  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 10);
    }
  }
}
