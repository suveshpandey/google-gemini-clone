import React, { useContext } from 'react'
import Navbar from './Navbar'
import Maincontainer from './Maincontainer'
const Maincomp = ({extended, setExtended, isDarkMode, setIsDarkMode}) => {

    return (
        <div className={`w-[100%] h-[100%] ${isDarkMode ? `bg-[#131314] transition-all duration-200` : `bg-white transition-all duration-200`}`}>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Maincontainer extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} />
        </div>
    )
}

export default Maincomp;
