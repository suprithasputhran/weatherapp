import './main.css'
import CityCard from './components/CityCard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentLocation from './components/CurrentLocation';
import SearchBar from './components/SearchBar';

function App() {


  return (
    <div className=' m-0 p-0 bg-gradient-to-b from-indigo-950 to-gray-400'>
      <div style={{
        backgroundImage: `url()`,

        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh'

      }} className=' relative bg-transperent object-cover h-screen bg-blend-lighten'>
        <Router>
          <SearchBar />

          <Routes>
            <Route path="/" element={<CurrentLocation />} />
            <Route path="/citycard" element={<CityCard />} />
          </Routes>
        </Router>
        {/* <CityCard /> */}
        {/* <CurrentLocation /> */}

      </div>
    </div>
  )
}

export default App
