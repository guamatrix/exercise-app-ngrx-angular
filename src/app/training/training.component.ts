import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import * as fromTraining from './store/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  imTraining$: Observable<boolean>;
  constructor(private trainingSv: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.imTraining$ = this.store.pipe(select(fromTraining.getIsRunningExercise));
  }
}
