import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImportData from './components/ImportData';
function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/import/data' element={<ImportData />} />
        </Routes>
      </Router>


    </>
  );
}

export default App;
