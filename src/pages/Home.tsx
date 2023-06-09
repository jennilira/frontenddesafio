import React from 'react'
import ListPatients from '../components/TablesList/listPatients/ListPatients'
import Modalpaciente from '../assets/layouts/Modal/modal'
import PaginationExample from '../components/TablesList/listPatients/Pagination'

function Home() {
  return (
    <div>
<Modalpaciente/>
  {/* <ListPatients/> */}
  <PaginationExample/>
    </div>
  )
}

export default Home