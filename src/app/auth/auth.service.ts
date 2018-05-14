import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-date.module';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/UI.service';
import * as fromRoot from '../app.reducer';
import * as UIActions from '../shared/store/ui.actions';
import * as AuthActions from './store/auth.actions';
import { Subject } from 'rxjs/Subject';
import { SidenavListComponent } from '../core/navigation/sidenav-list/sidenav-list.component';

@Injectable()
export class AuthService {
  componentInfo = new Subject<() => void>();

  constructor(private route: Router,
    private afAuth: AngularFireAuth,
    private trainginSv: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) {}

  initAuthListerner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AuthActions.Login());
        this.route.navigate(['training']);
      } else {
        this.store.dispatch(new AuthActions.Logoff());
        this.trainginSv.cancelSubscription();
        this.route.navigate(['/login']);
      }
    });
  }

  registredUser(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UIActions.StopLoading());
        console.log(result);
      }).catch(error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(resp => {
        this.store.dispatch(new UIActions.StopLoading());
        console.log(resp);
      }).catch(error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
      }).catch(error => {
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

}
