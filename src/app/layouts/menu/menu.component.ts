import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(private translate: TranslateService) { }

  ngOnInit() { }

  // tslint:disable-next-line: use-lifecycle-interface


}
