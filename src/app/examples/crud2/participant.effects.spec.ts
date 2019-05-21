import { LocalStorageService } from '@app/core';
import {
  ActionParticipantsDeleteOne,
  ActionParticipantsUpsertOne
} from './participants.actions';
import { ParticipantState } from './participant.model';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { EMPTY, of } from 'rxjs';
import { ParticipantsEffects, PARTICIPANT_KEY } from './participants.effects';
import { AngularFirestore } from '@angular/fire/firestore';

describe('ParticipantsEffects', () => {
  describe('persistParticipants', () => {
    const participantsState: ParticipantState = {
      entities: {
        '1': {
          option: 'Author',
          description: 'Description',
          id: '1',
          nom: 'Title'
        }
      },
      ids: ['1']
    };
    let localStorage: LocalStorageService;
    let store: Store<any>;

    beforeEach(() => {
      localStorage = jasmine.createSpyObj('localStorage', ['setItem']);
      store = of({
        examples: {
          participants: participantsState
        }
      }) as any;
    });
    /*
    it('should not dispatch any actions', () => {
      const actions = new Actions(EMPTY);
      const effects = new ParticipantsEffects(actions, store, localStorage);
      const metadata = getEffectsMetadata(effects);

      expect(metadata.persistParticipant).toEqual({ dispatch: false });
    });

    it('should call setItem on LocalStorageService for delete one action', () => {
      const action = new ActionParticipantsDeleteOne({ id: '1' });
      const source = cold('a', { a: action });
      const actions = new Actions(source);
      const effects = new ParticipantsEffects(actions, store, localStorage);

      effects.persistParticipant.subscribe(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          PARTICIPANT_KEY,
          participantsState
        );
      });
    });

    it('should call setItem on LocalStorageService for upsert one action', () => {
      const action = new ActionParticipantsUpsertOne({ participant: {} as any });
      const source = cold('a', { a: action });
      const actions = new Actions(source);
      const effects = new ParticipantsEffects(actions, store, localStorage);

      effects.persistParticipant.subscribe(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          PARTICIPANT_KEY,
          participantsState
        );
      });
    });
    */
  });
});
