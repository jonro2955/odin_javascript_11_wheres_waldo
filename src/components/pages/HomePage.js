import LevelTile from '../LevelTile';
import TopScores from '../TopScores';

export default function HomePage() {
  return (
    <div id='HomePage' className='page'>
      <nav className='nav-wrapper'>
        <div className='brand-logo center'>FIND IT! (The Game)</div>
      </nav>
      <div id='tileBox'>
        <LevelTile levelName='planets' />
        <LevelTile levelName='countries' />
        <LevelTile levelName='games' />
      </div>
      <TopScores />
    </div>
  );
}
