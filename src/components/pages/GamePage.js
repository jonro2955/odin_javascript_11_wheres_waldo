//node package imports
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import M from 'materialize-css';
//image imports
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
//my own component imports
import TargetMenu from '../TargetMenu';
import { targetData, attemptResult } from '../targets.js';
//firebase imports
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
//initialize firebase
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

//Default export component: <GamePage/>
export default function GamePage() {
  const level = useParams().level;
  const isInitialMount = useRef(true); //for running useEffect on dependency updates only
  const [gameOn, setGameOn] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const [clickedCoords, setClickedCoords] = useState({ x: '', y: '' });
  const [targets, setTargets] = useState(targetData);
  const [seconds, setSeconds] = useState(0);
  let secondsCounter = 0;

  //[timerOn]
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

  //[seconds]
  useEffect(() => {
    document.getElementById('seconds').textContent = paddedTime(seconds % 60);
    document.getElementById('minutes').textContent = paddedTime(
      parseInt(seconds / 60)
    );
  }, [seconds]);

  // Save a new entry to Cloud Firestore.
  async function saveTimeToCloud() {
    let name = document.getElementById('fname').value;
    if (name.length > 0) {
      try {
        await addDoc(collection(getFirestore(), 'data'), {
          name: name,
          level: level,
          seconds: seconds,
          time: Date.now(),
        });
        console.log('writing to cloud');
      } catch (error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    } else {
      alert('no name');
    }
  }

  //M.toast() is materialize js library's popup modal
  function toast(msg) {
    M.toast({
      html: msg,
      inDuration: 300,
      outDuration: 375,
      displyLength: 3000,
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
    //toggle menu off
    setMenuOn(false);
    //test selection and coodinates using attemptResult()
    if (!isInitialMount.current) {
      const gameImage = document.getElementById('gameImage');
      let clickedX = clickedCoords['x'] - gameImage.offsetLeft;
      let clickedY = clickedCoords['y'] - gameImage.offsetTop;
      let selection = e.target.textContent;
      let result = attemptResult(level, clickedX, clickedY, selection);
      //if result, then user selected correct coordinates and menu item
      if (result) {
        toast(`${result} found!!!`);
        //mark item as found in targets
        let tmp = targets;
        tmp[level].forEach((levelTarget) => {
          if (levelTarget['name'] === result) {
            levelTarget['found'] = true;
          }
        });
        setTargets(tmp);
        /*************************************************************
         *if all targets found, do stuff in the backend with the seconds
         ************************************************************/
        if (allLevelTargetsFound(level, tmp)) {
          toast(`All found in ${seconds} seconds`);
          setTimerOn(false);
          openEntryForm();
        }
        //else: missed. Reset user click
      } else {
        toast('Missed!');
        setClickedCoords('');
      }
    }
  }

  function incrementTime() {
    secondsCounter++;
    setSeconds(secondsCounter);
  }

  function paddedTime(seconds) {
    let valString = seconds + '';
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

  function openEntryForm() {
    let elem = document.getElementById('modal1');
    var modal = M.Modal.init(elem, { dismissible: false });
    modal.open();
  }
  function closeEntryForm() {
    let elem = document.getElementById('modal1');
    var modal = M.Modal.init(elem, { dismissible: false });
    modal.close();
  }

  function start() {
    setGameOn(true);
    setTimerOn(true);
    setMenuOn(false);
    isInitialMount.current = false;
  }

  function restart() {
    isInitialMount.current = true;
    secondsCounter = 0;
    setSeconds(0);
    setTimerOn(false);
    setGameOn(false);
    setMenuOn(false);
    let tmp = targets;
    tmp[level].forEach((levelTarget) => {
      levelTarget['found'] = false;
    });
    setTargets(tmp);
    closeEntryForm();
  }

  return (
    <div id='GamePage' className='page'>
      <nav className='nav-wrapper purple accent-3 valign-wrapper'>
        <div className='brand-logo center'>{level.toUpperCase()}</div>
        <button
          className='waves-effect green accent-2 btn right-align'
          id='restart'
          onClick={restart}
        >
          Restart
        </button>
      </nav>
      <h5 id='headline'>Find: {getObjectivesString(level, targets)}</h5>
      <div id='timer'>
        <h5 id='minutes'>00</h5>
        <h5>:</h5>
        <h5 id='seconds'>00</h5>
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
          clickedX={clickedCoords['x']}
          clickedY={clickedCoords['y']}
          menuClickHandler={menuClickHandler}
          level={level}
          targets={targets}
        />
      )}
      {/* Name entry form modal */}
      <div id='modal1' className='modal'>
        <div className='modal-content'>
          <h4>Your time was {seconds} seconds</h4>
          <label htmlFor='fname'>Please enter your name:</label>
          <input type='text' id='fname' name='fname'></input>
        </div>
        <div className='modal-footer'>
          <a
            onClick={restart}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Restart
          </a>
          <a
            onClick={saveTimeToCloud}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Submit
          </a>
        </div>
      </div>

      <div id='ringCursor'></div>
    </div>
  );
}
