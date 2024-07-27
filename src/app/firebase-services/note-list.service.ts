import { Injectable, inject } from '@angular/core';
import {Note} from '../interfaces/note.interface'
import {  Firestore, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  //items$;
  //items;

unsubTrash;
unsubNotes;
//unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unsubNotes = this.subTrashList();
    this.unsubTrash = this.subTrashList();

 //this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a66sdfdfffff"), (element) => {

  }

 //this.unsubSingle();
 



 //this.items$ = collectionData(this.getNotesRef());
 //this.items = this.items$.subscribe( (list) => {
 // list.forEach(element => {
  //  console.log(element);
 // });
// })

//}


ngonDestroy(){
  this.unsubNotes();
  this.unsubTrash();
  //this.items.unsubscribe();
}


subTrashList(){
  return onSnapshot(this.getTrashRef(), (list) => {
    this.trashNotes = [];
    list.forEach(element => {
      this.trashNotes.push(this.setNoteObject(element.data(), element.id));
    });
  });
}

subNotesList(){
  return onSnapshot(this.getNotesRef(), (list) => {
    this.normalNotes = [];
    list.forEach(element => {
      this.normalNotes.push(this.setNoteObject(element.data(), element.id));
    });
  });
}
setNoteObject(obj: any, id: string): Note {
  return{
    id: id || "",
    type: obj.type || "note",
    title: obj.title || "",
    content: obj.content || "",
    marked: obj.marked || false,

  }
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
