import GamePathTile from '../elements/GamePathTile';

export default function HomePage() {
  return (
    <div id='HomePage'>
      <h1>HomePage</h1>
      <h3>Levels:</h3>
      <GamePathTile pathName='Planets' />
      <GamePathTile pathName='World Countries' />
      <GamePathTile pathName='Game Characters' />
    </div>
  );
}
