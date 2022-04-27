import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
import TargetMenu from '../elements/TargetMenu';
import { targetData, attemptResult } from '../elements/targets';
import M from 'materialize-css';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/firebaseConfig.js'; 
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

export default function GamePage() {
  const level = useParams().level;
  const isInitialMount = useRef(true); //for running useEffect on dependency updates only
  const [gameOn, setGameOn] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const [clickedCoords, setClickedCoords] = useState({ x: '', y: '' });
  const [userSelection, setUserSelection] = useState('');
  const [targets, setTargets] = useState(targetData);
  const [time, setTime] = useState(0);
  let totalSeconds = 0;

  // Saves a new time on the Cloud Firestore.
  async function saveTime(timeValue) {
    try {
      await addDoc(collection(getFirestore(), 'records'), {
        name: '1',
        time: timeValue,
      });
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  //[clickedCoords, userSelection]
  useEffect(() => {
    if (!isInitialMount.current) {
      const gameImage = document.getElementById('gameImage');
      let clickedX = clickedCoords['x'] - gameImage.offsetLeft;
      let clickedY = clickedCoords['y'] - gameImage.offsetTop;
      let result = attemptResult(level, clickedX, clickedY, userSelection);
      //if result, then user has clicked a target area and selected the correct menu option for it
      if (result) {
        toast(`${result} found!!!`);
        //set item as found in targets
        let tmp = targets;
        tmp[level].forEach((levelTarget) => {
          if (levelTarget['name'] === result) {
            levelTarget['found'] = true;
          }
        });
        setTargets(tmp);
        /*************************************************************
         *if all targets found, do stuff in the backend with the time
         ************************************************************/
        if (allLevelTargetsFound(level, tmp)) {
          toast(`All found in ${time} seconds`);
          setTimerOn(false);
          saveTime(time);
        }
      }
    }
    //reset userSelection to force user to select the correct item each time
    setUserSelection('');
  }, [clickedCoords, userSelection]);

  //[timerOn] start the internal timer
  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(incrementTime, 1000);
    } else {
      clearInterval(interval);
    }
    // stop timer on unmount
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  //[time] update time display
  useEffect(() => {
    document.getElementById('time').textContent = paddedTime(time % 60);
    document.getElementById('minutes').textContent = paddedTime(
      parseInt(time / 60)
    );
  }, [time]);

  function toast(msg) {
    M.toast({
      html: msg,
      inDuration: 300,
      outDuration: 375,
      displyLength: 4000,
      classes: 'rounded',
      completeCallback: () => {
        console.log(msg);
      },
    });
  }

  function imageClickHandler(e) {
    //toggle menu
    menuOn ? setMenuOn(false) : setMenuOn(true);
    //Make useEffect run on updates only
    isInitialMount.current = false;
    //save clicked coords
    setClickedCoords({ x: e.pageX, y: e.pageY });
  }

  function menuClickHandler(e) {
    //menu off
    setMenuOn(false);
    //save menu selection
    setUserSelection(e.target.textContent);
  }

  function incrementTime() {
    totalSeconds++;
    setTime(totalSeconds);
  }

  function paddedTime(time) {
    let valString = time + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }

  function allLevelTargetsFound(level, targets) {
    return targets[level].every((obj) => {
      return obj['found'] === true;
    });
  }

  function getObjectivesString(level, targets) {
    let array = [];
    targets[level].forEach((target) => {
      array.push(target['name']);
    });
    return array.join(', ');
  }

  function getLevelImage(level) {
    switch (level) {
      case 'planets':
        return planetsImg;
      case 'countries':
        return countriesImg;
      case 'games':
        return gamesImg;
      default:
        return null;
    }
  }

  // Change mouse pointer inside game image
  function imageMouseEnterHandler() {
    //The div with id=ringCursor is styled to make it look special
    const ringCursor = document.getElementById('ringCursor');
    const gameImage = document.getElementById('gameImage');
    gameImage.addEventListener('mousemove', (e) => {
      //top and left values are updated in response to mouse movements
      ringCursor.style.top = e.pageY + 'px';
      ringCursor.style.left = e.pageX + 'px';
      ringCursor.style.display = 'initial';
    });
  }

  // Make special mouse pointer disappear outside game image
  function imageMouseLeaveHandler() {
    document.getElementById('ringCursor').style.display = 'none';
  }

  function imageMouseDownHandler() {
    document.getElementById('ringCursor').classList.add('clickAnimation');
  }

  function imageMouseUpHandler() {
    document.getElementById('ringCursor').classList.remove('clickAnimation');
  }

  function start() {
    setGameOn(true);
    setTimerOn(true);
    setMenuOn(false);
    isInitialMount.current = false;
  }

  function reset() {
    isInitialMount.current = true;
    totalSeconds = 0;
    setTime(0);
    setTimerOn(false);
    setGameOn(false);
    setMenuOn(false);
    let tmp = targets;
    tmp[level].forEach((levelTarget) => {
      levelTarget['found'] = false;
    });
    setTargets(tmp);
  }

  return (
    <div id='GamePage' className='page'>
      <nav className='nav-wrapper purple accent-3 valign-wrapper'>
        <div className='brand-logo center'>{level.toUpperCase()}</div>
        <button
          className='waves-effect green accent-2 btn right-align'
          id='reset'
          onClick={reset}
        >
          reset
        </button>
      </nav>
      <h5 id='headline'>Find: {getObjectivesString(level, targets)}</h5>
      <div id='timer'>
        <h5 id='minutes'>00</h5>
        <h5>:</h5>
        <h5 id='time'>00</h5>
      </div>
      {gameOn ? (
        <img
          src={getLevelImage(level)}
          alt={level}
          id='gameImage'
          width='1150'
          onMouseEnter={imageMouseEnterHandler}
          onMouseLeave={imageMouseLeaveHandler}
          onMouseDown={imageMouseDownHandler}
          onMouseUp={imageMouseUpHandler}
          onClick={imageClickHandler}
        />
      ) : (
        <button id='startBtn' onClick={start}></button>
      )}
      {menuOn && (
        <TargetMenu
          className='dd-list-item'
          clickedX={clickedCoords['x']}
          clickedY={clickedCoords['y']}
          menuClickHandler={menuClickHandler}
          level={level}
          targets={targets}
        />
      )}
      <div id='ringCursor'></div>
    </div>
  );
}
