import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Renderer2, Inject, PLATFORM_ID,
} from '@angular/core';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-scroller',
  standalone: true,
  imports: [NgForOf, TranslatePipe],
  templateUrl: './scroller.component.html',
  styleUrl: './scroller.component.scss',
})
export class ScrollerComponent implements AfterViewInit {
  @ViewChildren('scroller') scrollerEls!: QueryList<ElementRef>;

  texts = [
    '🚀 Unlock your potential — Keep pushing forward! 🚀 Unlock your potential — Keep pushing forward! 🚀',
    '🚀 Unlock your potential — Keep pushing forward! 🚀 Unlock your potential — Keep pushing forward! 🚀',
    '🚀 Unlock your potential — Keep pushing forward! 🚀 Unlock your potential — Keep pushing forward! 🚀',
    '🚀 Unlock your potential — Keep pushing forward! 🚀 Unlock your potential — Keep pushing forward! 🚀',

  ];

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.scrollerEls.forEach((scrollerRef) => {
          const scroller = scrollerRef.nativeElement;
          const inner = scroller.querySelector('.scroller__inner');
          if (inner) {
            this.renderer.setAttribute(scroller, 'data-animated', 'true');

            const children = Array.from(inner.children);
            children.forEach((child: any) => {
              const clone = child.cloneNode(true) as HTMLElement;
              this.renderer.setAttribute(clone, 'aria-hidden', 'true');
              this.renderer.appendChild(inner, clone);
            });
          }
        });
      }
    }

  }
}
