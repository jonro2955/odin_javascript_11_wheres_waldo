import LevelTile from '../LevelTile';
import Records from '../Records';
import Nav from '../Nav';
import React from 'react';
import { initializeApp } from 'firebase/app';
//initialize firebase
import { getFirebaseConfig } from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/firebaseConfig.js';
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default function HomePage() {
  return (
    <div id='HomePage' className='page'>
      <Nav headline='FIND IT! (The Game)' />
      <div id='tileBox'>
        <LevelTile levelName='planets' />
        <LevelTile levelName='countries' />
        <LevelTile levelName='games' />
      </div>
      <h5>Top 10 Scores</h5>
      <Records limit={10} />
    </div>
  );
}
