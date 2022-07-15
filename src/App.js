import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddItem from './components/add-item';
import Item from './components/item';
import ItemList from './components/item-list';




function App() {
  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/items' className='navbar-brand'>
          Keith
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/add'} className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<ItemList />} />
          <Route path='/items' element={<ItemList />} />
          <Route path='/add' element={<AddItem />} />
          <Route path='/items/:id' element={<Item />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;