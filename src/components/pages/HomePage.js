import LevelTile from '../LevelTile';
import Records from '../Records';
import React, { useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
//initialize firebase
import { getFirebaseConfig } from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/firebaseConfig.js';
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default function HomePage() {
  const [records, setRecords] = useState([]);

  async function a() {
    let array = [];
    const q = query(collection(getFirestore(), 'records'), orderBy('seconds'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      array.push(doc.records());
    });
    setRecords(array);
  }

  async function b() {
    const array = [];
    const q = query(collection(getFirestore(), 'records'), orderBy('seconds'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        array.push(doc.records());
      });
      setRecords(array);
    });
  }

  a();

  return (
    <div id='HomePage' className='page'>
      <nav className='nav-wrapper'>
        <div className='brand-logo center'>FIND IT! (The Game)</div>
      </nav>
      <div id='tileBox'>
        <LevelTile levelName='planets' />
        <LevelTile levelName='countries' />
        <LevelTile levelName='games' />
      </div>
      <Records records={records} level='homepage'/>
    </div>
  );
}
