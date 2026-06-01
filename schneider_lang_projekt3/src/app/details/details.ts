import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
})
export class Details {

  user: any;

  constructor() {
    this.user = history.state.user;
  }
}
