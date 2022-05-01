//node package imports
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import M from 'materialize-css';
//image imports
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
//my own components
import Nav from '../Nav';
import TargetMenu from '../TargetMenu';
import { targetData, attemptResult } from '../targets.js';
//firebase imports
import { getFirestore, collection, addDoc } from 'firebase/firestore';

//Default export component: <GamePage/>
export default function GamePage() {
  const level = useParams().level;
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
      toast('Timer on!');
      interval = setInterval(() => {
        secondsCounter++;
        setSeconds(secondsCounter);
      }, 1000);
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

  // Save a new name entry to Firestore.
  async function saveNameToCloud() {
    let name = document.getElementById('playerName').value;
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
      alert('Save cancelled.');
    }
  }

  //M.toast() is materialize-css library's popup notification modal
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
    //set clickedCoords state
    setClickedCoords({ x: e.pageX, y: e.pageY });
  }

  function menuClickHandler(e) {
    const gameImage = document.getElementById('gameImage');
    let clickedX = clickedCoords['x'] - gameImage.offsetLeft;
    let clickedY = clickedCoords['y'] - gameImage.offsetTop;
    let selection = e.target.textContent;
    let result = attemptResult(level, clickedX, clickedY, selection);
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
      //if all targets found, stop timer and open the name entry modal
      if (allLevelTargetsFound(level, tmp)) {
        toast(`All found in ${seconds} seconds`);
        setTimerOn(false);
        openNameEntryModal();
      }
      //else: missed. Reset user click
    } else {
      toast('Missed!');
      setClickedCoords('');
    }
    setMenuOn(false);
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

  function openNameEntryModal() {
    let elem = document.getElementById('nameEntryModal');
    var modal = M.Modal.init(elem, { dismissible: false });
    modal.open();
  }

  function closeEntryForm() {
    let elem = document.getElementById('nameEntryModal');
    var modal = M.Modal.init(elem, { dismissible: false });
    modal.close();
  }

  function start() {
    setGameOn(true);
    setTimerOn(true);
    setMenuOn(false);
  }

  function restart() {
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
      <Nav headline={level.toUpperCase()} />
      <h5 id='headline'>Find: {getObjectivesString(level, targets)}</h5>
      <div id='timer' className='valign-wrapper'>
        <h5 id='minutes'>00</h5>
        <h5>:</h5>
        <h5 id='seconds'>00</h5>
      </div>

      {gameOn ? (
        <>
          <button
            className='waves-effect green accent-2 btn'
            id='restart'
            onClick={restart}
          >
            Restart
          </button>
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
        </>
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
      {/* Name entry modal */}
      <div id='nameEntryModal' className='modal'>
        <div className='modal-content'>
          <h4>Your time was {seconds} seconds</h4>
          <label htmlFor='playerName'>Please enter your name:</label>
          <input
            type='text'
            maxLength='50'
            id='playerName'
            name='playerName'
          ></input>
        </div>
        <div className='modal-footer'>
          <button
            onClick={restart}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Restart
          </button>
          <button
            onClick={saveNameToCloud}
            className='modal-close waves-effect waves-green btn-flat'
          >
            Submit
          </button>
        </div>
      </div>

      <div id='ringCursor'></div>
    </div>
  );
}
