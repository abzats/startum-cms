import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'firebase/firestore';
import { Firestore, QueryDocumentSnapshot, collection, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { defaultSchedule } from './firebase.default-values';

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
  auth: Auth;

  constructor(private zone: NgZone) {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth();
  }

  async signIn(email: string, password: string): Promise<boolean> {
    const authResult = await signInWithEmailAndPassword(this.auth, email, password);
    return !!authResult;
  }

  async signOut() {
    return await signOut(this.auth);
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

  async setSchedule(schedule: ScheduleItem[]): Promise<boolean> {
    const querySnapshot = await getDocs<ScheduleItem, any>(collection(this.db, 'schedule') as any).catch(() => {
      console.error('Cannot connect to DB');

      return undefined;
    });

    return querySnapshot
      ? (
          await Promise.all(
            querySnapshot.docs.map((item: QueryDocumentSnapshot, index) => {
              return updateDoc(item.ref, schedule[index])
                .then(() => true)
                .catch(() => false);
            }),
          )
        ).indexOf(false) === -1
      : false;
  }

  async getPrices(): Promise<PriceItem[] | undefined> {
    return this.zone.runOutsideAngular(async () => {
      const querySnapshot = await getDocs<PriceItem, any>(collection(this.db, 'price') as any).catch(() => {
        console.error('Cannot connect to DB');

        return undefined;
      });

      return querySnapshot?.docs.map((item) => item.data());
    });
  }

  async setPrices(prices: PriceItem[]): Promise<boolean> {
    const querySnapshot = await getDocs<PriceItem, any>(collection(this.db, 'price') as any).catch(() => {
      console.error('Cannot connect to DB');

      return undefined;
    });

    return querySnapshot
      ? (
          await Promise.all(
            querySnapshot.docs.map((item: QueryDocumentSnapshot, index) => {
              return updateDoc(item.ref, prices[index])
                .then(() => true)
                .catch(() => false);
            }),
          )
        ).indexOf(false) === -1
      : false;
  }
}
