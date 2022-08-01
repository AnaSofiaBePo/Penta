import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  constructor(private firestore: AngularFirestore) {}

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
