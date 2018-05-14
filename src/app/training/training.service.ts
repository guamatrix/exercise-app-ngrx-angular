import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/UI.service';
import * as fromTraining from './store/training.reducer';
import * as UI from '../shared/store/ui.actions';
import * as TrainingAcions from './store/training.actions';

@Injectable()
export class TrainingService {
  private subscription: Subscription[] = [];

  constructor(private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>) {}

  fetchAvailableExercise() {
    this.store.dispatch(new UI.StartLoading());
    this.db.firestore.settings({timestampsInSnapshots: true});
    this.subscription.push(this.db.collection('availableExercise')
      .snapshotChanges()
      .map(resultArray => {
        // throw ( Error());
        return resultArray.map(res => {
            return {
              id: res.payload.doc.id,
              name: res.payload.doc.data().name,
              duration: res.payload.doc.data().duration,
              calories: res.payload.doc.data().calories
            };
          });
        }
      ).subscribe((exercise: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new TrainingAcions.GetAvailableTrainings(exercise));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error, null, 3000);
        this.store.dispatch(new TrainingAcions.GetAvailableTrainings([]));
      }
    ));
  }

  startExericise(selectedId: string) {
    this.store.dispatch(new TrainingAcions.StartTraining(selectedId));
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(
      runningExercise => {
        this.addDataToDatabase({
          ...runningExercise,
          duration: runningExercise.duration * (progress / 100),
          calories: runningExercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });
        this.store.dispatch(new TrainingAcions.StopTraining());
      }
    );
  }

  completeExercise() {
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(
      runningExercise => {
        this.addDataToDatabase({
          ...runningExercise,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new TrainingAcions.StopTraining());
      }
    );
  }

  fetchCompleteOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.subscription.push(this.db.collection('finishedExercises').valueChanges().subscribe(
      (exercise: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new TrainingAcions.GetFinishedTrainings(exercise));
      }, error => {
        this.uiService.showSnackBar(error, null, 3000);
        this.store.dispatch(new TrainingAcions.GetFinishedTrainings([]));
      }
    ));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
      .then(
        resp => {
          console.log(resp);
        }
      ).catch(error => {
        this.uiService.showSnackBar(error, null, 3000);
      });
  }

  cancelSubscription() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
