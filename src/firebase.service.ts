import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { Firestore, collection, getDocs, getFirestore } from 'firebase/firestore';
import { defaultPrices, defaultSchedule } from './firebase.default-values';

const firebaseConfig = {
  apiKey: 'AIzaSyB6zZYS-HF9oOqJYL5zx3cFxUCHi0vatNs',
  authDomain: 'startum-d550d.firebaseapp.com',
  projectId: 'startum-d550d',
  storageBucket: 'startum-d550d.appspot.com',
  messagingSenderId: '452041197758',
  appId: '1:452041197758:web:3a189c7f1f7f4a7b41f6ef',
};

interface PriceLanguageItem {
  description: string;
  extension: string;
}
export type PriceItem = {
  main: string;
  ru: PriceLanguageItem;
  en: PriceLanguageItem;
  da: PriceLanguageItem;
};
export type ScheduleItem = { time: string; ru: string; en: string; da: string };

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app: FirebaseApp;
  db: Firestore;

  constructor(private zone: NgZone) {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async getSchedule(): Promise<ScheduleItem[]> {
    return this.zone.runOutsideAngular(async () => {
      const querySnapshot = await getDocs<ScheduleItem, any>(collection(this.db, 'schedule') as any).catch(() => {
        console.error('Cannot connect to DB');

        return undefined;
      });

      return querySnapshot?.docs.map((item) => item.data()) || defaultSchedule;
    });
  }

  async getPrices(): Promise<PriceItem[]> {
    return this.zone.runOutsideAngular(async () => {
      const querySnapshot = await getDocs<PriceItem, any>(collection(this.db, 'price') as any).catch(() => {
        console.error('Cannot connect to DB');

        return undefined;
      });

      return querySnapshot?.docs.map((item) => item.data()) || defaultPrices;
    });
  }

  // async setPrices() {
  //   const querySnapshot = await getDocs<PriceItem, any>(collection(this.db, 'price') as any).catch(() => {
  //     console.error('Cannot connect to DB');

  //     return undefined;
  //   });

  //   querySnapshot?.docs.forEach((item: QueryDocumentSnapshot, index) => {
  //     updateDoc(item.ref, defaultPrices[index]);
  //   });
  // }
}
