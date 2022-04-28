import { Link } from 'react-router-dom';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function LevelTile(props) {
  const image = () => {
    switch (props.levelName) {
      case 'planets':
        return planetsImg;
      case 'countries':
        return countriesImg;
      case 'games':
        return gamesImg;
      default:
        return null;
    }
  };

  return (
    <div className='LevelTile'>
      <h3>{props.levelName.toUpperCase()}</h3>
      <Link
        className='LevelLink'
        to={`/${props.levelName}`}
        style={{
          backgroundImage: `url(${image()})`,
        }}
      ></Link>
    </div>
  );
}
