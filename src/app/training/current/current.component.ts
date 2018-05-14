import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { ConfirmStopDialog } from './confirm-stop-dialog.component';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../store/training.reducer';
import { take } from 'rxjs/operators/take';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: number;
  suscription: Subscription;

  constructor(private dialog: MatDialog,
    private traingingSv: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getRunningExercise).pipe(take(1)).subscribe(
      exercise => {
        const step = exercise.duration / 100 * 1000;
        this.timer = window.setInterval(() => {
          this.progress += 5;
          if (this.progress >= 100) {
            this.traingingSv.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    );
  }

  onStop() {
    clearInterval(this.timer);
    const dialogref = this.dialog.open(ConfirmStopDialog, {
      data: {
        progress: this.progress
      }
    });

    this.suscription = dialogref.afterClosed().subscribe(
      result => {
        if (result) {
          this.traingingSv.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
  }

}
