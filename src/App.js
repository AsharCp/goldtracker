import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Rates from './pages/Rates';
import Admin from './pages/Admin';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/rates" Component={Rates} />
            <Route path="/goldenvoiceadmin" Component={Admin} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
