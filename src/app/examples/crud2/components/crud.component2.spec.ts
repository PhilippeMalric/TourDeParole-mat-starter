import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core';
import { MockStore, TestingModule } from '@testing/utils';

import { State } from '../../examples.state';
import { ParticipantState } from '../participant.model';
import { CrudComponent2 } from './crud.component2';

describe('CrudComponent', () => {
  let component: CrudComponent2;
  let fixture: ComponentFixture<CrudComponent2>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, TestingModule],
      declarations: [CrudComponent2]
    }).compileComponents();
    store = TestBed.get(Store);
    store.setState(createState({ ids: [], entities: {} }));
    fixture = TestBed.createComponent(CrudComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function createState(participantsState: ParticipantState) {
  return {
    examples: {
      participants: participantsState
    }
  } as State;
}
