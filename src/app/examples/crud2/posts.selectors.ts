import { createSelector } from '@ngrx/store';

import { selectRouterState } from '@app/core';

import { selectExamples, ExamplesState } from '../examples.state';

import { participantAdapter } from './participants.reducer';
import { Participant } from './participant.model';

const { selectEntities, selectAll } = participantAdapter.getSelectors();

export const selectParticipants = createSelector(
  selectExamples,
  (state: ExamplesState) => state.participants
);

export const selectAllParticipants = createSelector(
  selectParticipants,
  selectAll
);

export const selectParticipantsEntities = createSelector(
  selectParticipants,
  selectEntities
);

export const selectSelectedParticipant = createSelector(
  selectParticipantsEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);

/*
eTab.filter((e:Participant) => e.parole)
*/
