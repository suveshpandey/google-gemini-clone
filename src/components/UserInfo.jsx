import { useContext } from "react"
import { Context } from "../context/Context"

import { FaUserCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

export function UserInfo({isDarkMode}){
    const{email, password, userName, logout} = useContext(Context);
    return <div className="bg-transparent  sm:h-[90vh] h-[95vh] flex flex-col items-center py-10">
        <h1 className='sm:text-6xl text-5xl font-serif pb-0  bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent '>User Profile</h1>

        <div className={`sm:w-[75%] w-[98%] border-[1px] border-slate-400 flex flex-col justify-center items-center mt-10  ${isDarkMode ? `bg-slate-900` : `bg-[#b9d6f2]` } bg-opacity-30 rounded-md sm:p-10 p-5 text-white `}>
            <div className=""><FaUserCircle className={`size-[70px] text-gray-400 `} /></div>
            <div className="flex w-[100%] sm:w-[60%] justify-center">
                <p className={`sm:text-xl text-lg font-serif mb-3 ${isDarkMode ? `text-[#c2dfe3]` : 'text-[#284b63] '}`}>{userName}</p>
            </div>
            <div className=" sm:w-[60%] w-[90%] h-[2px] bg-gradient-to-l from-blue-500 to-red-500  mb-3 " ></div>
            <div className="flex w-[100%] sm:w-[60%] justify-center space-x-3 mb-2 ">
                <p className={`sm:text-md  text-lg font-serif ${isDarkMode ? `text-blue-200` : 'text-[#3B1E54] '} `}>Your Email : <span className={`sm:text-md  text-lg font-serif ml-1 ${isDarkMode ? `text-blue-300` : 'text-[#091057] '}`}>{email}</span></p>
            </div>
            <div className="flex w-[100%] sm:w-[60%] justify-center space-x-3 mb-2">
                <p className={`sm:text-md  text-lg font-serif ${isDarkMode ? `text-blue-200` : 'text-[#3B1E54] '} `}>Your Password : <span className={`sm:text-md  text-lg font-serif ml-1 ${isDarkMode ? `text-blue-300` : 'text-[#091057] '}`}>{password || `Can not be displayed here!`}</span></p>
            </div>
            <button onClick={logout} className={`flex justify-center items-center bg-[#001933] ${isDarkMode ? `bg-[#778da9] text-slate-200 font-semibold` : `bg-[#001933]`} hover:bg-opacity-90 px-5 py-2 rounded-md`}>Logout <TbLogout className="ml-2" /></button>
        </div>
    </div>
}