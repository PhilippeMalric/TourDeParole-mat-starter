import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '@app/core';

import { State } from '../examples.state';
import { ParticipantActionTypes } from './participants.actions';
import { selectParticipants } from './participants.selectors';
import { AngularFirestore } from '@angular/fire/firestore';

export const PARTICIPANT_KEY = 'EXAMPLES.PARTICIPANT';

@Injectable()
export class ParticipantsEffects {
  constructor(
    private afs: AngularFirestore,
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect({ dispatch: false })
  persistParticipant = this.actions$.pipe(
    ofType(
      ParticipantActionTypes.UPSERT_ONE,
      ParticipantActionTypes.DELETE_ONE
    ),
    withLatestFrom(this.store.pipe(select(selectParticipants))),
    tap(([actions, participantsState]) => {
      this.localStorageService.setItem(PARTICIPANT_KEY, participantsState);
      this.afs
        .collection('participant')
        .doc('2BESmRO2MUsu3B1v6wwb')
        .update(participantsState);
    })
  );
}
