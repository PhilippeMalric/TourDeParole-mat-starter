import { Action } from '@ngrx/store';
import { Participant } from './participant.model';

export enum ParticipantActionTypes {
  UPSERT_ONE = '[Participants] Upsert One',
  UPSERT_ALL = '[Participants] Upsert All',
  DELETE_ONE = '[Participants] Delete One'
}

export class ActionParticipantsUpsertOne implements Action {
  readonly type = ParticipantActionTypes.UPSERT_ONE;
  constructor(readonly payload: { participant: Participant }) {}
}

export class ActionParticipantsUpsertAll implements Action {
  readonly type = ParticipantActionTypes.UPSERT_ALL;
  constructor(readonly payload: { participants: Participant[] }) {}
}

export class ActionParticipantsDeleteOne implements Action {
  readonly type = ParticipantActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export type ParticipantActions =
  | ActionParticipantsUpsertOne
  | ActionParticipantsDeleteOne
  | ActionParticipantsUpsertAll;
