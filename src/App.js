import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./components/home'));
const About = lazy(() => import('./components/about'));

const App = () => (
  
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
    <Link to="/about">About</Link>
    <br/>
    <Link to="/">Home</Link>
  </Router>
 
);

export default App;
