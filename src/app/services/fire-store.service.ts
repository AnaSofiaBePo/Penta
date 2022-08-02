import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  constructor(private firestore: AngularFirestore) {}

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getCollection() {
    console.log('Antes de leer');
    this.firestore
      .collection('chats')
      .valueChanges()
      .subscribe((ref) => {
        console.log(ref);
      });
  }
}
