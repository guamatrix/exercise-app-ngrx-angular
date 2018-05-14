import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/UI.service';
import * as fromTraining from '../store/training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  typesTaingins$: Observable<Exercise[]>;
  formTraining: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private trainginSv: TrainingService,
    private uiServ: UIService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.typesTaingins$ = this.store.pipe(select(fromTraining.getAvailableExercises));
    this.tryFetch();

    this.formTraining = new FormGroup({
      training: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.trainginSv.startExericise(this.formTraining.value.training);
  }

  private tryFetch() {
    this.trainginSv.fetchAvailableExercise();
  }
}
