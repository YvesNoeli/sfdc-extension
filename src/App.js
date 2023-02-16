import { Routes,Route } from 'react-router-dom';
import Categories from './routes/Categories';
import Metadatas from './routes/Metadatas';
import Error from './routes/Error';
import Tree from './routes/Tree';
import SearchResult from './routes/SearchResult';


function App() {
  return (
      <Routes>
          <Route path='/' element={<Categories />} />
          <Route path='/index.html' element={<Categories />} />
          <Route path='/Metadatas/:categoryName/:categoryOccurencies' element={<Metadatas />} />
          <Route path='/Tree/:categoryName/:metadataName/:metadataId' element={<Tree />} />
          <Route path='/SearchResult/:searchValue/:searchType' element={<SearchResult />} />
          <Route path='/SearchResult/:searchValue' element={<SearchResult />} />
          <Route path='*' element={<Error />} />
      </Routes>
  );
}

export default App;
