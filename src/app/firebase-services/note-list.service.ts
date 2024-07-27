import { Injectable, inject } from '@angular/core';
import {Note} from '../interfaces/note.interface'
import {  Firestore, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
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
        console.log(element.data());
      });
    });

 this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a66sdfdfffff"), (element) => {

 });

 this.unsubSingle();
 



 this.items$ = collectionData(this.getNotesRef());
 this.items = this.items$.subscribe( (list) => {
  list.forEach(element => {
    console.log(element);
  });
 })

}


ngonDestroy(){
  this.unsubList();
  this.items.unsubscribe();
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
