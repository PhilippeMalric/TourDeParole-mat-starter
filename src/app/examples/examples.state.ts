import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';
import { bookReducer } from './crud/books.reducer';
import { formReducer } from './form/form.reducer';
import { FormState } from './form/form.model';
import { Book, BookState } from './crud/books.model';
import { Participant, ParticipantState } from './crud2/participant.model';
import { postReducer } from './crud2/post.reducer';
import { participantReducer } from './crud2/participants.reducer';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
  todos: todosReducer,
  stocks: stockMarketReducer,
  books: bookReducer,
  participants: participantReducer,
  form: formReducer
};

export interface ExamplesState {
  todos: TodosState;
  stocks: StockMarketState;
  form: FormState;
  books: BookState;
  participants: ParticipantState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
