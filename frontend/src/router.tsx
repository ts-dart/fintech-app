import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/home' element={ <Home/> }/>
        <Route path='/register' element={ <Register/> }/>
      </Routes>
    </BrowserRouter>
  );
}