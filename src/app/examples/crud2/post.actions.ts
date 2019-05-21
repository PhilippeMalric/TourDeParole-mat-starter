import { Action } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const GET_POST = 'Post get';
export const GET_POST_SUCCESS = 'Post get success';

export const VOTE_UPDATE = 'Post Vote';
export const VOTE_SUCCESS = 'Post Vote success';
export const VOTE_FAIL = 'Post Vote fail';

export class GetPost implements Action {
  readonly type = GET_POST;
  constructor(public payload: string) {}
}

export class GetPostSuccess implements Action {
  readonly type = GET_POST_SUCCESS;
  constructor(public payload: Post) {}
}

export type All = GetPost | GetPostSuccess;
