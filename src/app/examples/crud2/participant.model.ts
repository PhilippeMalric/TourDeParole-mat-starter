import { EntityState } from '@ngrx/entity';

export interface Participant {
  id: string;
  nom: string;
  option: string;
  description: string;
  parole?: boolean;
  time?: string;
  position?: number;
}

export function getTimeStamp() {
  const now = new Date();
  const stamp =
    now.getUTCMonth() +
    1 +
    '/' +
    now.getUTCDate() +
    '/' +
    now.getUTCFullYear() +
    ' ' +
    now.getHours() +
    ':' +
    now.getMinutes() +
    ':' +
    now.getSeconds();
  return stamp + '';
}

export interface ParticipantState extends EntityState<Participant> {}
