import { ParticipantState } from './participant.model';
import { participantReducer, initialState } from './participants.reducer';
import {
  ActionParticipantsUpsertOne,
  ActionParticipantsDeleteOne
} from './participants.actions';

describe('BookReducer', () => {
  const TEST_INITIAL_STATE: ParticipantState = {
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        nom: 'Reactive Programming with Angular and ngrx',
        option: 'Oren Farhi',
        description:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = participantReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a participant', () => {
    const action = new ActionParticipantsUpsertOne({
      participant: {
        id: '1234',
        nom: 'test',
        option: 'test',
        description: 'test',
        parole: false
      }
    });
    const state = participantReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].nom).toEqual('test');
  });

  it('should update a participant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionParticipantsUpsertOne({
      participant: {
        id: id,
        nom: 'updated',
        option: 'updated',
        description: 'updated',
        parole: true
      }
    });

    const state = participantReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        nom: 'updated',
        option: 'updated',
        description: 'updated',
        parole: true
      })
    );
  });

  it('should remove a participant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionParticipantsDeleteOne({ id });
    const state = participantReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
