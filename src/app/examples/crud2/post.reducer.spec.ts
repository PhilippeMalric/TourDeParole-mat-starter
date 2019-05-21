import { postReducer } from './post.reducer';

describe('Post Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      //const result = reducer(initialState, action);

      expect(action).toBe(action);
    });
  });
});
