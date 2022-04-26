export const targetData = {
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

export function attemptResult(level, clickedX, clickedY, menuSelection) {
  switch (level) {
    case 'planets':
      if (
        802 < clickedX &&
        clickedX < 842 &&
        311 < clickedY &&
        clickedY < 351 &&
        menuSelection === `Mercury`
      ) {
        return menuSelection;
      }
      if (
        585 < clickedX &&
        clickedX < 625 &&
        328 < clickedY &&
        clickedY < 368 &&
        menuSelection === `Mars`
      ) {
        return menuSelection;
      }
      if (
        155 < clickedX &&
        clickedX < 203 &&
        419 < clickedY &&
        clickedY < 468 &&
        menuSelection === `Neptune`
      ) {
        return menuSelection;
      }
      break;
    case 'countries':
      if (
        230 < clickedX &&
        clickedX < 260 &&
        389 < clickedY &&
        clickedY < 419 &&
        menuSelection === `Honduras`
      ) {
        return menuSelection;
      }
      if (
        570 < clickedX &&
        clickedX < 620 &&
        415 < clickedY &&
        clickedY < 455 &&
        menuSelection === `Central African Republic`
      ) {
        return menuSelection;
      }
      if (
        592 < clickedX &&
        clickedX < 622 &&
        288 < clickedY &&
        clickedY < 318 &&
        menuSelection === `Bulgaria`
      ) {
        return menuSelection;
      }
      break;
    case 'games':
      if (
        68 < clickedX &&
        clickedX < 108 &&
        294 < clickedY &&
        clickedY < 334 &&
        menuSelection === `Solid Snake's face`
      ) {
        return menuSelection;
      }
      if (
        221 < clickedX &&
        clickedX < 261 &&
        363 < clickedY &&
        clickedY < 403 &&
        menuSelection === `Mercury`
      ) {
        return menuSelection;
      }
      if (
        892 < clickedX &&
        clickedX < 932 &&
        136 < clickedY &&
        clickedY < 176 &&
        menuSelection === `Mercury`
      ) {
        return menuSelection;
      }
      break;
    default:
      break;
  }
  return null;
}
