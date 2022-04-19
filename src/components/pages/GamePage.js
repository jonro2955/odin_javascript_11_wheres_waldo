import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function GamePage() {
  const clickedCoordsOutputDiv = document.getElementById('clickedCoordinates');
  const level = useParams().level;
  const [lastCoord, setLastCoord] = useState({ x: '', y: '' });
  useEffect(() => {
    document.getElementById('clickedCoordinates').textContent =
      lastCoord['x'] + ', ' + lastCoord['y'];
  }, [lastCoord]);

  const findables = {
    // planets: ['Mercury', 'Jupiter', 'Saturn'],
    planets: [
      { name: 'Mercury', x: '', y: '' },
      { name: 'Jupiter', x: '', y: '' },
      { name: 'Saturn', x: '', y: '' },
    ],
    countries: ['Honduras', 'Central African Republic', 'Bulgaria'],
    countriesCoords: {
      honduras: { x: '', y: '' },
      car: { x: '', y: '' },
      bulgaria: { x: '', y: '' },
    },
    games: ['Solid Snake', 'Lara Croft', 'Megaman'],
    gamesCoords: {
      snake: { x: '', y: '' },
      lara: { x: '', y: '' },
      megaman: { x: '', y: '' },
    },
  };

  function objectives() {
    let array = [];
    switch (level) {
      case 'Planets':
        findables['planets'].forEach((planet) => {
          array.push(planet['name']);
        });
        return array.join(', ');
      case 'Countries':
        return findables['countries'].join(', ');
      case 'Games':
        return findables['games'].join(', ');
      default:
        return null;
    }
  }

  function image() {
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
    //The div with the .ringCursor class is styled to make it look like a ring
    let ringCursor = document.querySelector('.ringCursor');
    ringCursor.style.display = 'initial';
    document.getElementById('gameImage').addEventListener('mousemove', (e) => {
      //the ringCursor div's top and left style values are updated in response to mouse movements
      ringCursor.style.top = e.pageY + 'px';
      ringCursor.style.left = e.pageX + 'px';
    });
  }

  function mouseLeaveHandler() {
    let ringCursor = document.querySelector('.ringCursor');
    ringCursor.style.display = 'none';
  }

  // Open item selection menu at click location
  function clickHandler(e) {
    console.log(e.clientX, e.clientY);
    setLastCoord({ x: e.clientX, y: e.clientY });
    // document.getElementById('clickedCoordinates').textContent =
    //   'Clicked Coordinates: ' + e.clientX + ', ' + e.clientY;
  }

  return (
    <div className='page'>
      <h2>{level}</h2>
      <h6>Find: {objectives()}</h6>
      <img
        src={image()}
        alt={level}
        className='gameImage'
        id='gameImage'
        width='1150'
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={clickHandler}
      ></img>
      <div className='ringCursor'></div>
      <div id='clickedCoordinates'></div>
    </div>
  );
}
