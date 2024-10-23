import React, { Children, useContext, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { Context } from '../context/Context';

const Sidebar = ({extended, setExtended, isDarkMode}) => {
    const {onSent, previousPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    function sidebarExtend(){
        setExtended(!extended);
    }
    return (
        <div className={`${extended ? `sm:w-[350px] w-[300px] h-[100%]` : `sm:w-[80px] sm:h-[100vh] w-auto h-[5vh]`}  ${!isDarkMode && !extended && `sm:bg-slate-200 bg-transparent`} ${!isDarkMode && extended && `sm:bg-slate-200 bg-slate-200`} ${isDarkMode && !extended && `sm:bg-[#1f1f1f] bg-[#131314]`} ${isDarkMode && extended && `sm:bg-[#1f1f1f] bg-[#1f1f1f]`} h-[100vh] w-[300px] absolute sm:relative sm:grid-rows-[60%_40%] justify-start sm:pt-5 pt-1 pb-5 sm:px-5 px-2 transition-all duration-200 z-10 `}>
            <div className='flex flex-col h-[100%] '>
                <button onClick={sidebarExtend} className={` w-[40px] p-2 sm:mt-0 mt-2 rounded-full transition-colors duration-200 ${isDarkMode ? `hover:bg-[#252933] ` : `hover:bg-slate-300`} `}><FiMenu className={`h-[25px] w-[25px] ${isDarkMode ? `text-slate-200` : `text-slate-700`}`} /></button>
                <button onClick={newChat} className={`flex items-center justify-center  ${isDarkMode ? `bg-[#252933] hover:bg-[#2a2e3e] text-gray-400` : `bg-gray-300 hover:bg-opacity-70 text-slate-600`} ${extended ? `block px-6` : `sm:block sm:pl-3 hidden`}  h-10 rounded-full  font-semibold mt-5 transition-all duration-300`}><FaPlus className={`${extended && `mr-4`}`} />{extended && "New Chat"}</button>
            
                {extended && <div className='mt-10'>
                    <p className={`text-lg font-semibold mb-2 pl-2 ${isDarkMode ? `text-gray-200` : `text-gray-800`} `}>Recent</p>
                    <div>
                        {previousPrompts.map((item, index)=>{
                            return(
                                <RecentChats key={index} item={item} loadPrompt={loadPrompt} isDarkMode={isDarkMode}>{item.slice(0,15)} . . .</RecentChats>
                            )
                        })}
                    </div>
                </div>}
            </div>
        </div>
    )
}
function RecentChats({children, item, loadPrompt, isDarkMode}){
    return(
        <div onClick={() => loadPrompt(item)} className={`flex items-center pt-2  transition-colors duration-200 w-[100%] rounded-full px-5 py-1 mb-2 cursor-pointer ${isDarkMode ? `text-gray-300 hover:bg-[#292929]` : `text-gray-800 hover:bg-slate-300`} `}><FiMessageSquare className='mr-4' /><span className='mb-1'>{children}</span></div>
    )
}

export default Sidebar
