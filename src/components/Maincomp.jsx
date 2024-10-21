import React, { useContext } from 'react'
import Navbar from './Navbar'
import Maincontainer from './Maincontainer'
const Maincomp = ({extended, setExtended}) => {

    return (
        <div className='w-[100%] h-[100%] '>
            <Navbar />
            <Maincontainer extended={extended} setExtended={setExtended} />
        </div>
    )
}

export default Maincomp
