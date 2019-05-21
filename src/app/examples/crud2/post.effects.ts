import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';

import * as postActions from './post.actions';
import { map, delay, mergeMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
export type Action = postActions.All;

@Injectable()
export class PostEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {}

  @Effect({ dispatch: false })
  getPost: Observable<Action> = this.actions.pipe(
    ofType(postActions.GET_POST),
    tap((action: postActions.GetPost) =>
      console.log('effect1:' + action.payload)
    )
  );
}
