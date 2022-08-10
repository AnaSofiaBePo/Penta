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

  getCollection<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    return collection.valueChanges();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  getDataUser<tipo>(path: string, id: string){
    return  this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getId(): string{
    return this.firestore.createId();
  }
}
