import GamePathTile from '../elements/GamePathTile';
import TopScores from '../elements/TopScores';

export default function HomePage() {
  return (
    <div id='HomePage'>
      <h1 className='center'>Find It! (The Game)</h1>
      <div id='tileBox'>
        <GamePathTile pathName='Planets' />
        <GamePathTile pathName='Countries' />
        <GamePathTile pathName='Games' />
      </div>
      <TopScores />
    </div>
  );
}
