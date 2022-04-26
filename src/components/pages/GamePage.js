import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
import TargetMenu from '../elements/TargetMenu';
import { targetData, attemptResult } from '../elements/targets';

export default function GamePage() {
  const level = useParams().level;
  const isInitialMount = useRef(true); //for running useEffect on dependency updates only
  const [gameOn, setGameOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const [clickedCoords, setClickedCoords] = useState({ x: '', y: '' });
  const [userSelection, setUserSelection] = useState();
  const [targets, setTargets] = useState(targetData);
  const [seconds, setSeconds] = useState(0);
  let totalSeconds = 0;

  //[userSelection]
  useEffect(() => {
    if (!isInitialMount.current) {
      const gameImage = document.getElementById('gameImage');
      let clickedX = clickedCoords['x'] - gameImage.offsetLeft;
      let clickedY = clickedCoords['y'] - gameImage.offsetTop;
      let result = attemptResult(level, clickedX, clickedY, userSelection);
      //if result, then user has clicked a target area and selected the correct menu option for it
      if (result) {
        console.log(result);
        //disable the found option
        let tmp = targets;
        tmp[level].forEach((levelTarget) => {
          if (levelTarget['name'] === result) {
            levelTarget['found'] = true;
          }
        });
        setTargets(tmp);
      }
    }
    //reset userSelection to force user to select the correct item from the menu each time
    setUserSelection('');
  }, [clickedCoords, userSelection]);

  function imageClickHandler(e) {
    //toggle menu
    menuOn ? setMenuOn(false) : setMenuOn(true);
    //for running useEffect on dependency updates only
    isInitialMount.current = false;
    //update the coords portion of userSelection
    // let tmp = userSelection;
    // tmp['coords'] = { x: e.pageX, y: e.pageY };
    setClickedCoords({ x: e.pageX, y: e.pageY });
  }

  function menuClickHandler(e) {
    //menu off
    setMenuOn(false);
    //update the menuSelection portion of userSelection
    // let tmp = userSelection;
    // tmp['menuSelection'] = e.target.textContent;
    setUserSelection(e.target.textContent);
  }

  //[gameOn] starts the internal timer
  useEffect(() => {
    let interval;
    if (gameOn) {
      interval = setInterval(incrementTime, 1000);
    } else {
      clearInterval(interval);
    }
    // stop timer on unmount
    return () => {
      clearInterval(interval);
    };
  }, [gameOn]);

  //[seconds] updates the time display
  useEffect(() => {
    document.getElementById('seconds').textContent = paddedTime(seconds % 60);
    document.getElementById('minutes').textContent = paddedTime(
      parseInt(seconds / 60)
    );
  }, [seconds]);

  function incrementTime() {
    totalSeconds++;
    setSeconds(totalSeconds);
  }

  function paddedTime(time) {
    let valString = time + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }

  function getObjectivesString() {
    let array = [];
    targets[level].forEach((target) => {
      array.push(target['name']);
    });
    return array.join(', ');
  }

  function getLevelImage() {
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
    isInitialMount.current = false;
  }

  return (
    <div id='GamePage' className='page'>
      <h2>{level.toUpperCase()}</h2>
      <h5>Find: {getObjectivesString()}</h5>
      <div id='timer'>
        <h5 id='minutes'>00</h5>
        <h5>:</h5>
        <h5 id='seconds'>00</h5>
      </div>
      {gameOn ? (
        <img
          src={getLevelImage()}
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
      <button id='endBtn'>End</button>
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
