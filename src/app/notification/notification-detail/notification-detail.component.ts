import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {
  detail: any = {};
  rootUrl = environment.rootPathUrl;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.detail = {
      title: params['title'],
      description: params['description'],
      mrn: params['mrn'],
      createDate: params['createDate'],
      notificationType: params['notificationType'],
      isNotificationRead: params['isNotificationRead']
    };
  });
}

  backClicked(): void {
    this._location.back();
  }
}
