import { useParams } from 'react-router-dom';
import { useState } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';
import React from 'react';

export default function GamePage() {
  const level = useParams().level;
  const [gameOn, setGameOn] = useState(false);

  const targets = {
    /* Values 'x' and 'y' are predetermined distances of the centerpoint of each findable
    'thing' inside the picture (i.e. a planet or the face of a game character chosen by me) 
    relative to the upper left corner of the the img element rendered with a width of 1150px 
    (using the img element's offsetLeft and offsetTop properties). Such a relative 
    pixel coordinate does not change with the positioning of the image in the browser window 
    (such as when the dev tools are opened) or the zoom level.
    */
    Planets: [
      { name: 'Mercury', x: '822', y: '331' },
      { name: 'Mars', x: '605', y: '348' },
      { name: 'Neptune', x: '179', y: '443' },
    ],
    Countries: [
      { name: 'Honduras', x: '245', y: '404' },
      { name: 'Central African Republic', x: '595', y: '435' },
      { name: 'Bulgaria', x: '607', y: '303' },
    ],
    Games: [
      { name: "Solid Snake's face", x: '88', y: '314' },
      { name: "Lara Croft's face", x: '241', y: '383' },
      { name: "Megaman's face", x: '912', y: '156' },
    ],
  };

  function imageClickHandler(e) {
    const gameImage = document.getElementById('gameImage');
    const coordX = e.pageX - gameImage.offsetLeft;
    const coordY = e.pageY - gameImage.offsetTop;
    const clickedCoordDiv = document.getElementById('clickedCoordDiv');
    clickedCoordDiv.textContent = `${coordX}, ${coordY}`;
    switch (level) {
      case 'Planets':
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
      case 'Countries':
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
      case 'Games':
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

  function getObjectivesString() {
    let array = [];
    switch (level) {
      case 'Planets':
        targets['Planets'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'Countries':
        targets['Countries'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'Games':
        targets['Games'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      default:
        return null;
    }
    return array.join(', ');
  }

  function getImage() {
    switch (level) {
      case 'Planets':
        return planetsImg;
      case 'Countries':
        return countriesImg;
      case 'Games':
        return gamesImg;
      default:
        return null;
    }
  }

  // Make mouse pointer become a circle inside game image
  function mouseEnterHandler() {
    const ringCursor = document.getElementById('ringCursor');
    //The div with id=ringCursor is styled to make it look like a ring
    const gameImage = document.getElementById('gameImage');
    gameImage.addEventListener('mousemove', (e) => {
      //the top and left style values are updated in response to mouse movements
      ringCursor.style.top = e.pageY + 'px';
      ringCursor.style.left = e.pageX + 'px';
      ringCursor.style.display = 'initial';
    });
  }

  // Make ring cursor disappear outside game image
  function mouseLeaveHandler() {
    document.getElementById('ringCursor').style.display = 'none';
  }

  function mouseDownHandler() {
    document.getElementById('ringCursor').classList.add('clickAnimation');
  }

  function mouseUpHandler() {
    document.getElementById('ringCursor').classList.remove('clickAnimation');
  }

  function padTime(val) {
    let valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  }
  function start() {
    setGameOn(true);
    let minutesLabel = document.getElementById('minutes');
    let secondsLabel = document.getElementById('seconds');
    let totalSeconds = 0;
    function setTime() {
      ++totalSeconds;
      secondsLabel.textContent = padTime(totalSeconds % 60);
      minutesLabel.textContent = padTime(parseInt(totalSeconds / 60));
    }
    setInterval(setTime, 1000); //stop the count using clearInterval()
  }

  return (
    <div className='page'>
      <h2>{level}</h2>
      <h5>Find: {getObjectivesString()}</h5>
      <div id='timer'>
        <h5 id='minutes'>00</h5>
        <h5 id='timeDivider'>:</h5>
        <h5 id='seconds'>00</h5>
      </div>
      {gameOn ? (
        <img
          src={getImage()}
          alt={level}
          id='gameImage'
          width='1150'
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          onMouseDown={mouseDownHandler}
          onMouseUp={mouseUpHandler}
          onClick={imageClickHandler}
        />
      ) : (
        <button id='startBtn' onClick={start}></button>
      )}
      <div id='clickedCoordDiv'>Coords</div>
      <div id='ringCursor'></div>
    </div>
  );
}
