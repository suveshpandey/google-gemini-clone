import React, { Children, useContext, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { Context } from '../context/Context';

const Sidebar = ({extended, setExtended}) => {
    const {onSent, previousPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    function sidebarExtend(){
        setExtended(!extended);
    }
    return (
        <div className={`h-[100vh] ${extended ? `w-[300px]` : `w-[80px]`} bg-slate-200 grid cols-[60%_40%] justify-between pt-5 pb-5 px-5 transition-all duration-300`}>
            <div className='flex flex-col h-[100%] '>
                <button onClick={sidebarExtend} className=' w-[40px] p-2 rounded-full hover:bg-slate-300 transition-colors duration-200'><FiMenu className='h-[25px] w-[25px] ' /></button>
                <button onClick={newChat} className={`flex items-center justify-center bg-gray-300 ${extended && `px-5`} h-10 rounded-full text-slate-500 font-semibold mt-5 transition-all duration-300`}><FaPlus className={`${extended && `mr-4`}`} />{extended && "New Chat"}</button>
            
                {extended && <div className='mt-10'>
                    <p className='text-lg font-semibold text-gray-700 mb-2 '>Recent</p>
                    <div>
                        {previousPrompts.map((item, index)=>{
                            return(
                                <RecentChats key={index} item={item} loadPrompt={loadPrompt}>{item.slice(0,15)} ...</RecentChats>
                            )
                        })}
                    </div>
                </div>}
            </div>
            <div>
                
            </div>
        </div>
    )
}
function RecentChats({children, item, loadPrompt}){
    return(
        <div onClick={() => loadPrompt(item)} className='flex items-center hover:bg-slate-300 transition-colors duration-200 w-[100%] rounded-full px-5 py-1 pt-2 mb-2 cursor-pointer '><FiMessageSquare className='mr-4' /><span className='mb-2'>{children}</span></div>
    )
}

export default Sidebar
