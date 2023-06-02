
import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Example from '../Modal/modal'
import './MainLayout.css'
import ListPatients from '../../../components/TablesList/listPatients/ListPatients'
import Header from '../Header/Header'

function Mainlayout() {
  return (
    <div className='tudo'>
     <Sidebar/>
     <div className='main'>
     <Header/>
   
        <div className='main-content'>
      
          {/* <div className='content'> */}
          <Example/>
          <ListPatients/>
          {/* </div> */}
        
        </div>
        
    </div> 
    </div>
  )
}

export default Mainlayout
