import { v4 as uuid } from 'uuid';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, merge, of, observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { State } from '../../examples.state';
import { Participant, getTimeStamp } from '../participant.model';
import {
  ActionParticipantsUpsertOne,
  ActionParticipantsDeleteOne,
  ActionParticipantsUpsertAll
} from '../participants.actions';
import {
  selectSelectedParticipant,
  selectAllParticipants
} from '../participants.selectors';
import { map, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'anms-crud2',
  templateUrl: './crud.component2.html',
  styleUrls: ['./crud.component2.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent2 {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  participantFormGroup = this.fb.group(CrudComponent2.createParticipant());
  participants$: Observable<Participant[]> = this.store.pipe(
    select(selectAllParticipants)
  );
  participantsParole$: Observable<Participant[]> = this.store.pipe(
    select(selectAllParticipants),
    map((participants: Participant[]) => {
      let data = participants.filter(e => e.parole).sort((a, b) => {
        return a.time > b.time ? 1 : -1;
      });
      data = data.map((p, i) => {
        return { ...p, position: i + 1 };
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      return data;
    })
  );
  selectedParticipant$: Observable<Participant> = this.store.pipe(
    select(selectSelectedParticipant),
    tap(e => {
      this.selectedParticipant = e;
    })
  );
  selectedParticipant: Participant;
  isEditing: boolean;

  entitiesParticipant$: Observable<any>;

  static createParticipant(): Participant {
    return {
      id: uuid(),
      nom: '',
      option: '',
      description: '',
      parole: false
    };
  }

  displayedColumns = ['position', 'nom'];
  dataSource = null;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private afs: AngularFirestore,
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.entitiesParticipant$ = this.afs
      .collection('participant')
      .doc('2BESmRO2MUsu3B1v6wwb')
      .valueChanges()
      .pipe(
        map((obj: any) => obj.entities),

        map(entities => {
          return Object.keys(entities).map((k: string) => entities[k]);
        }),
        tap((participants: Participant[]) => {
          console.log('dispatch : ');

          console.log(participants);

          this.store.dispatch(
            new ActionParticipantsUpsertAll({ participants: participants })
          );
        })
      );
  }

  ngOnInit(): void {
    this.entitiesParticipant$.subscribe(participants => {
      console.log('participants : ');

      console.log(participants);
    });

    this.participantsParole$.subscribe();
  }

  select(participant: Participant) {
    this.isEditing = false;
    this.router.navigate(['examples/crud2', participant.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud2']);
  }

  edit(participant: Participant) {
    this.isEditing = true;
    this.participantFormGroup.setValue(participant);
  }

  addNew(participantForm: NgForm) {
    participantForm.resetForm();
    this.participantFormGroup.reset();
    this.participantFormGroup.setValue(CrudComponent2.createParticipant());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(participant: Participant) {
    this.store.dispatch(
      new ActionParticipantsDeleteOne({ id: participant.id })
    );
    this.isEditing = false;
    this.router.navigate(['examples/crud2']);
  }

  save() {
    if (this.participantFormGroup.valid) {
      let participant = this.participantFormGroup.value;
      participant = { ...participant, parole: false, time: getTimeStamp() };
      this.store.dispatch(new ActionParticipantsUpsertOne({ participant }));
      this.isEditing = false;
      this.router.navigate(['examples/crud2', participant.id]);
    }
  }

  onChange(ob: MatSlideToggleChange) {
    this.store.dispatch(
      new ActionParticipantsUpsertOne({
        participant: {
          id: this.selectedParticipant.id,
          nom: this.selectedParticipant.nom,
          option: this.selectedParticipant.option,
          description: this.selectedParticipant.description,
          parole: ob.checked,
          time: getTimeStamp()
        }
      })
    );
  }
}
