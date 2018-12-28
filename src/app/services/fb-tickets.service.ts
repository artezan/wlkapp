import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FB_CONFIG } from '../_config/fb-config';
import { ITicket } from '../models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { URL_XML_JSON } from '../_config/funtion.xmlToJson';
import { Observable } from 'rxjs/internal/Observable';

firebase.initializeApp(FB_CONFIG);
// Inica firestore
const firestore = firebase.firestore();
// configuracion de firestore requerida
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
@Injectable({
  providedIn: 'root',
})
export class FbTicketsService {
  collectionRef = firestore.collection('tickets');
  constructor(private http: HttpClient) {}
  public saveTicket(ticket: ITicket): Promise<boolean> {
    return new Promise(resolve => {
      console.log(ticket);
      this.collectionRef
        .add(ticket)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
  public deleteByIdTicket(id: string): Promise<boolean> {
    return new Promise(resolve => {
      this.collectionRef
        .doc(id)
        .delete()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
  public getByIdTicket(id: string): Promise<ITicket> {
    return new Promise(async resolve => {
      const doc = await this.collectionRef.doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        data[id] = id;
        resolve(<any>data);
      } else {
        resolve(null);
      }
    });
  }
  public editByIdTicket(ticket: ITicket): Promise<boolean> {
    return new Promise(resolve => {
      this.collectionRef
        .doc(ticket.id)
        .update(ticket)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
  public getAll(): Promise<ITicket[]> {
    return new Promise(resolve => {
      this.collectionRef.onSnapshot(docs => {
        const data = [];
        docs.forEach(doc => {
          data.push(Object.assign(doc.data(), { id: doc.id }));
        });
        resolve(data);
      });
    });
  }
  public xmlToJson(xml: string): Observable<any> {
    return this.http.post(URL_XML_JSON, { xml });
  }
}
