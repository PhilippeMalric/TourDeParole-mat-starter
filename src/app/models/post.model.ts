import { EntityState } from '@ngrx/entity';

export interface Post {
  pushKey: string;
  loading: boolean;
  text: string;
  votes: number;
  error?: string;
}

export interface PostState extends EntityState<Post> {}
