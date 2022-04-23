import LevelTile from '../elements/GamePathTile';
import TopScores from '../elements/TopScores';

export default function HomePage() {
  return (
    <div className='page'>
      <h1>Find It! (The Game)</h1>
      <div id='tileBox'>
        <LevelTile levelName='Planets' />
        <LevelTile levelName='Countries' />
        <LevelTile levelName='Games' />
      </div>
      <TopScores />
    </div>
  );
}
