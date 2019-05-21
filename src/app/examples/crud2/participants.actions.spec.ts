import {
  ParticipantActionTypes,
  ActionParticipantsUpsertOne,
  ActionParticipantsDeleteOne
} from './participants.actions';

describe('Participant Actions', () => {
  it('should create ActionBooksUpsertOne action', () => {
    const action = new ActionParticipantsUpsertOne({
      participant: {
        id: '1',
        nom: 'test',
        option: 'test',
        description: ''
      }
    });
    expect(action.type).toEqual(ParticipantActionTypes.UPSERT_ONE);
    expect(action.payload.participant).toEqual(
      jasmine.objectContaining({
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      })
    );
  });

  it('should create ActionBooksDeleteOne action', () => {
    const action = new ActionParticipantsDeleteOne({ id: '1' });
    expect(action.type).toEqual(ParticipantActionTypes.DELETE_ONE);
    expect(action.payload.id).toEqual('1');
  });
});
