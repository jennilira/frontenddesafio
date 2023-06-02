import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

// import Sidebar from './assets/layouts/Sidebar/Sidebar';
// import Example from './assets/layouts/Modal/modal';
import Mainlayout from './assets/layouts/Mainlayout/MainLayout';
import ListPatients from './components/TablesList/listPatients/ListPatients';

function App() {
  return (
    <div>
   <Mainlayout/>

{/* 
   <Routes>
        <Route
          path="/home"
          element={
           <ListPatients/>
          }
        />
        </Routes>
        

        <Routes>
        <Route
          path="/home"
          element={
           <Home/>
           ...e nesse home fica tudo que é de home entende,,,pense..
          }
        />
        </Routes>
        
        
        */}
    </div>
  );
}

export default App;
