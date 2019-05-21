import * as PostActions from './post.actions';
import { Post, PostState } from '../../models/post.model';
import { State } from '@ngrx/store';

export type Action = PostActions.All;

/// Reducer function

/*
export function postReducer(state: Post, action: Action) {

  switch (action.type) {

    case PostActions.GET_POST:
      return { ...state, loading: true };

    case PostActions.GET_POST_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case PostActions.VOTE_UPDATE:
      return { ...state, ...action.payload, loading: true };

    case PostActions.VOTE_SUCCESS:
      return { ...state, loading: false };

    case PostActions.VOTE_FAIL:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;

  }
}
*/
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Participant, ParticipantState } from './participant.model';
import {
  ParticipantActionTypes,
  ParticipantActions
} from './participants.actions';

export function sortByName(a: Post, b: Post): number {
  return a.votes > b.votes ? -1 : 1;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortByName
});

export const initialState: PostState = postAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      pushKey: '',
      loading: false,
      text: '',
      votes: 0
    }
  }
});

export function postReducer(
  state: PostState = initialState,
  action: PostActions.All
): PostState {
  switch (action.type) {
    case PostActions.GET_POST:
      console.log("GET_POST : Que faire à l'état?");
      return state;

    case PostActions.GET_POST_SUCCESS:
      console.log("POST_SUCCESS : Que faire à l'état?");
      return state;

    default:
      return state;
  }
}
