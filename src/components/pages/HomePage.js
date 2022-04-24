import LevelTile from '../elements/LevelTile';
import TopScores from '../elements/TopScores';

export default function HomePage() {
  return (
    <div id='HomePage' className='page'>
      <h1>FIND IT! (The Game)</h1>
      <div id='tileBox'>
        <LevelTile levelName='planets' />
        <LevelTile levelName='countries' />
        <LevelTile levelName='games' />
      </div>
      <TopScores />
    </div>
  );
}
