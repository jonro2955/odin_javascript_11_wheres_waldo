//Must run 'npm i react-router-dom' before you can use router:
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.js';
import GamePage from './components/pages/GamePage.js';
import RecordsPage from './components/pages/RecordsPage.js';

export default function App() {
  return (
    <HashRouter basename='/'>
      <Routes>
        {/* When you place a colon after the slash in the path string, you 
        can create new variable paths using the <Link> object's "to" 
        parameter (see <GamePathTile/>). This "to" parameter creates a new 
        route, and the linked element (in this case <GamePage/>) will have 
        access to the "to" parameter as "useParams().level" */}
        <Route path='/:levelParam' element={<GamePage />} />
        <Route path='/records' element={<RecordsPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}
