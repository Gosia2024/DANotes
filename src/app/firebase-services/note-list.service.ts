import { Injectable, inject } from '@angular/core';
import {Note} from '../interfaces/note.interface'
import {  Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normaleNotes: Note[] = [];

  items$;
  items;

unsubList;
unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

 this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a66sdfdfffff"), (element) => {

 });

 this.unsubSingle();
 this.unsubList();



 this.items$ = collectionData(this.getNotesRef());
 this.items = this.items$.subscribe( (list) => {
  list.forEach(element => {
    console.log(element);
  });
 })
 this.items.unsubscribe();
}

 getNotesRef(){
   return collection(this.firestore, 'notes');
  }


getTrashRef(){
 return collection(this.firestore, 'trash');
}

getSingleDocRef(colId:string, docId:string){
return doc(collection(this.firestore, colId), docId);
}
  }
