import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Participant, ParticipantState } from './participant.model';
import {
  ParticipantActionTypes,
  ParticipantActions
} from './participants.actions';

export function sortByName(a: Participant, b: Participant): number {
  return a.nom.localeCompare(b.nom);
}

export const participantAdapter: EntityAdapter<
  Participant
> = createEntityAdapter<Participant>({
  sortComparer: sortByName
});

export const initialState: ParticipantState = participantAdapter.getInitialState(
  {
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        nom: 'Philippe Malric',
        option: 'Membre depuis 2017',
        description: 'Écrivez ce que vous voulez ici',
        parole: false
      }
    }
  }
);

export function participantReducer(
  state: ParticipantState = initialState,
  action: ParticipantActions
): ParticipantState {
  switch (action.type) {
    case ParticipantActionTypes.UPSERT_ONE:
      return participantAdapter.upsertOne(action.payload.participant, state);

    case ParticipantActionTypes.UPSERT_ALL:
      return participantAdapter.upsertMany(action.payload.participants, state);

    case ParticipantActionTypes.DELETE_ONE:
      return participantAdapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}
