import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'densul-header',
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}

