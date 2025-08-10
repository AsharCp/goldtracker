import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Rates from './pages/Rates';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Menu from './pages/Menu';
import View from './pages/View';
import Summary from './pages/Summary';



function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" Component={Menu} />
            <Route path="/about" Component={About} />
            <Route path="/rates" Component={Rates} />
            <Route path="/Admin" Component={Admin} />
            <Route path="/menu/:id" Component={View} />
            <Route path="/summary" Component={Summary} />

            
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
