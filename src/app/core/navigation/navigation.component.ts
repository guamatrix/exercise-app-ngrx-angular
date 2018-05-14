import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../app.reducer';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isAuth$: Observable<boolean>;
  // onClick: () => void;
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuth));
    // this.authService.componentInfo.subscribe((child) => {
    //   this.onClick = child;
    // });
  }

}
