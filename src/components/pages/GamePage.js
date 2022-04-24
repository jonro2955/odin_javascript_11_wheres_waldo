import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
import TargetMenu from '../elements/TargetMenu';

export default function GamePage() {
  const level = useParams().level;
  const isInitialMount = useRef(true); //for running useEffect on dependency updates only
  const [clickedCoords, setClickedCoords] = useState({ x: '', y: '' });
  const [gameOn, setGameOn] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  let totalSeconds = 0;

  const targets = {
    /* Values 'x' and 'y' are predetermined distances of the centerpoint of each findable
    'thing' inside the picture (i.e. a planet or the face of a game character chosen by me) 
    relative to the upper left corner of the the img element rendered with a width of 1150px 
    (using the img element's offsetLeft and offsetTop properties). Such a relative 
    pixel coordinate does not change with the positioning of the image in the browser window 
    (such as when the dev tools are opened) or the zoom level.
    */
    planets: [
      { name: 'Mercury', x: '822', y: '331', found: false },
      { name: 'Mars', x: '605', y: '348', found: false },
      { name: 'Neptune', x: '179', y: '443', found: false },
    ],
    countries: [
      { name: 'Honduras', x: '245', y: '404', found: false },
      { name: 'Central African Republic', x: '595', y: '435', found: false },
      { name: 'Bulgaria', x: '607', y: '303', found: false },
    ],
    games: [
      { name: "Solid Snake's face", x: '88', y: '314', found: false },
      { name: "Lara Croft's face", x: '241', y: '383', found: false },
      { name: "Megaman's face", x: '912', y: '156', found: false },
    ],
  };

  //gameOn dependent useEffect: Start timer on gameOn and stop timer on unmount
  useEffect(() => {
    let counter;
    if (gameOn) {
      counter = setInterval(incrementTime, 1000);
    }
    return () => {
      clearTimeout(counter);
    };
  }, [gameOn]);

  //clickedCoords dependent useEffect: do not run on initial mount
  useEffect(() => {
    if (!isInitialMount.current) {
      const gameImage = document.getElementById('gameImage');
      let coordX = clickedCoords['x'] - gameImage.offsetLeft;
      let coordY = clickedCoords['y'] - gameImage.offsetTop;
      const clickedCoordDiv = document.getElementById('clickedCoordDiv');
      clickedCoordDiv.textContent = `${coordX}, ${coordY}`;
      switch (level) {
        case 'planets':
          if (802 < coordX && coordX < 842 && 311 < coordY && coordY < 351) {
            clickedCoordDiv.textContent = `Mercury`;
          }
          if (585 < coordX && coordX < 625 && 328 < coordY && coordY < 368) {
            clickedCoordDiv.textContent = `Mars`;
          }
          if (155 < coordX && coordX < 203 && 419 < coordY && coordY < 468) {
            clickedCoordDiv.textContent = `Neptune`;
          }
          break;
        case 'countries':
          if (230 < coordX && coordX < 260 && 389 < coordY && coordY < 419) {
            clickedCoordDiv.textContent = `Honduras`;
          }
          if (570 < coordX && coordX < 620 && 415 < coordY && coordY < 455) {
            clickedCoordDiv.textContent = `Central African Republic`;
          }
          if (592 < coordX && coordX < 622 && 288 < coordY && coordY < 318) {
            clickedCoordDiv.textContent = `Bulgaria`;
          }
          break;
        case 'games':
          if (68 < coordX && coordX < 108 && 294 < coordY && coordY < 334) {
            clickedCoordDiv.textContent = `Solid Snake's face`;
          }
          if (221 < coordX && coordX < 261 && 363 < coordY && coordY < 403) {
            clickedCoordDiv.textContent = `Lara Croft's face`;
          }
          if (892 < coordX && coordX < 932 && 136 < coordY && coordY < 176) {
            clickedCoordDiv.textContent = `Megaman's face`;
          }
          break;
        default:
          break;
      }
    }
  }, [clickedCoords]);

  function imageClickHandler(e) {
    //for running useEffect on dependency updates only
    isInitialMount.current = false;
    setClickedCoords({ x: e.pageX, y: e.pageY });
    //target menu toggle
    menuOn ? setMenuOn(false) : setMenuOn(true);
  }

  function getObjectivesString() {
    let array = [];
    switch (level) {
      case 'planets':
        targets['planets'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'countries':
        targets['countries'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'games':
        targets['games'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      default:
        return null;
    }
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

  function paddedTime(time) {
    let valString = time + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }

  function incrementTime() {
    totalSeconds++;
    document.getElementById('seconds').textContent = paddedTime(
      totalSeconds % 60
    );
    document.getElementById('minutes').textContent = paddedTime(
      parseInt(totalSeconds / 60)
    );
  }

  function start() {
    setGameOn(true);
    //When End button is clicked, stop the counter using clearInterval(counter)
    document.querySelectorAll('.dd-list-item').forEach((item) => {
      item.addEventListener('click', () => {
        // if all clicked
        alert(totalSeconds);
        //save totalSeconds in records and run record functions
      });
    });
  }

  function menuClickHandler() {
    let x =
      clickedCoords['x'] - document.getElementById('gameImage').offsetLeft;
    let y = clickedCoords['y'] - document.getElementById('gameImage').offsetTop;

    console.log(level, x, y, totalSeconds);
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
      <div id='clickedCoordDiv'>Coords</div>
      <button id='endBtn'>End</button>
      {menuOn && (
        <TargetMenu
          className='dd-list-item'
          coordX={clickedCoords['x']}
          coordY={clickedCoords['y']}
          // menuClickHandler={menuClickHandler}
          level={level}
          targets={targets}
        />
      )}
      <div id='ringCursor'></div>
    </div>
  );
}
