import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appDirectives]',
})
export class DirectivesDirective implements OnInit {
  @Input() value: string;
  @Output() isVisible: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) {}

  @HostListener('document:is-scroll', ['$event'])
  onscroll(e) {
    // console.log(e);
    this.calcVisibility();
  }
  ngOnInit() {
    // console.log('inpuit', this.idElement);
  }

  calcVisibility() {
    const rect = this.el.nativeElement.getBoundingClientRect();

    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      this.customEmit(this.el, this.value);
    }
  }

  // Custom Events
  private customEmit(el, val) {
    this.isVisible.emit({ el, val });
    const domEvent = new CustomEvent('is-visible', {
      detail: { visible: val },
    });
    document.dispatchEvent(domEvent);
  }
}
