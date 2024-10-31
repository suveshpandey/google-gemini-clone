import React, { useContext } from 'react'
import Navbar from './Navbar'
import Maincontainer from './Maincontainer'
import { UserInfo } from './UserInfo';
import { Context } from '../context/Context';
const Maincomp = ({extended, setExtended, isDarkMode, setIsDarkMode}) => {
    console.log("rerendering")
    const {userInfo} = useContext(Context)
    return (
        <div className={`w-[100%] h-[100%] ${isDarkMode ? `bg-[#131314] transition-all duration-200` : `bg-white transition-all duration-200`}`}>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {userInfo ? <UserInfo isDarkMode={isDarkMode} /> : <Maincontainer extended={extended} setExtended={setExtended} isDarkMode={isDarkMode} />}
        </div>
    )
}

export default Maincomp;
