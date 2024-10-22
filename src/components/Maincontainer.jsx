import React from 'react'

import { IoGlobeOutline } from "react-icons/io5";
import { TbWriting } from "react-icons/tb";
import { MdFlightTakeoff } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";

import { Context } from '../context/Context'
import { useContext } from 'react';

const Maincontainer = ({extended, setExtended, isDarkMode}) => {
    
    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput, inputState, question, setQuestion} = useContext(Context)
    function searchCards(cardQuestion){
        onSent(cardQuestion)
    }
    return (
            <div className={`sm:w-[80%] w-[100%] 2xl:w-[65%] sm:h-[90vh] h-[95vh] grid sm:grid-rows-[75%_25%] grid-rows-[90%_10%] mx-auto`}>
                <div className={`h-[100%]`}>
                    {showResult ? <GetResult question={question} resultData={resultData} loading={loading} isDarkMode={isDarkMode} /> : <Greetings isDarkMode={isDarkMode} searchCards={searchCards} /> }
                </div>
                <div id="input-section" className={`flex items-end pb-3 ${isDarkMode ? `bg-[#131314]` : `bg-white`} transition-all duration-200`}>
                    <div className='w-[100%] h-auto rounded-full flex flex-col items-center justify-center sm:mt-5 mt-2 '>
                        <div className='sm:w-[100%] w-[95%] h-[65px] rounded-full grid sm:grid-cols-[90%_10%] grid-cols-[80%_20%] items-end justify-center'>
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' className={`h-[100%] w-[100%] ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`}  rounded-l-full outline-none sm:pl-10 pl-6 pr-2 text-lg text-gray-700 `} />
                            <button onClick={()=>onSent(input)} className={`flex items-center justify-center ${isDarkMode ? `bg-[#1f1f1f] text-slate-200 ` : `bg-slate-200`} h-[100%] w-[100%] rounded-r-full `}><VscSend  className={`w-[40px] h-[40px] rounded-full p-2 transition-colors duration-300 ${isDarkMode ? `hover:bg-[#292929]` : `hover:bg-slate-300`} `}/></button>
                        </div>
                        <p className={`text-center mt-5  text-sm ${isDarkMode ? `text-stone-300` : `text-slate-700`}`}>Gemini can make mistakes, so double-check it</p>
                    </div>
                </div>
            </div>
    )
}
function Greetings({isDarkMode, searchCards}){
    return(
        <>
            <div className='flex flex-col justify-center'>
                <div id="greet" className='w-[100%] py-10 sm:px-2 px-10 flex flex-col items-start '>
                        <p className='text-5xl sm:font-bold font-semibold bg-gradient-to-r from-blue-500 to-red-500 via-red-500 text-transparent bg-clip-text'>Hello, Suvesh</p>
                        <p className='text-5xl sm:font-bold font-semibold text-slate-400 opacity-55 sm:mt-4 mt-1'>How can I help you today?</p>
                </div>
                <div id="cards" className="sm:w-[100%] w-[350px] px-5 gap-x-2 flex flex-row sm:justify-between mt-10 mx-auto overflow-x-auto overflow-hidden">
                    <div onClick={() => searchCards("How is blockchain technology transforming data security and pravicy?")} className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>How is blockchain technology transforming data security and pravicy?</p>
                        <div className='flex justify-end'><IoGlobeOutline className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("Write a letter to my landlord about a broken appliance")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>How can AI and Data Science be used to tackle real-world challenges, like climate change or healthcare?</p>
                        <div className='flex justify-end'><TbWriting className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("Find flights and weather for an upcoming trip")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>Find flights and weather for an upcoming trip</p>
                        <div className='flex justify-end'><MdFlightTakeoff className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("How can AI reshape global economies and next decade?")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>How can AI reshape global economies and next decade?</p>
                        <div className='flex justify-end'><TbBulb className='w-[30px] h-[30px]' /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
function GetResult({question, resultData, loading, isDarkMode}){
    return (
        <div className='h-[100%] grid grid-rows-[6%_auto] py-5 sm:px-10 px-4 pr-7 '>
            <div className='flex w-[100%]'>
                <img className='rounded-full h-[30px] ' src="https://media.licdn.com/dms/image/v2/D4D03AQHO2aaVD-NAXA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718271118163?e=1735171200&v=beta&t=0d98Q-8Si6hqbGk15RDvOz9o-L0UFWjaQOuvZ-dD--g" alt="" />
                <h1 className={`ml-3  ${isDarkMode ? `text-gray-200` : `text-gray-700`} font-semibold `}>{question}</h1>
            </div>
            <div id='result-data' className=' w-[100%] h-[95%] overflow-y-auto grid grid-cols-[8%_auto] sm:mt-5' style={{overflowY: 'auto', scrollbarWidth: 'none'}}>
                <div>
                    <img className='rounded-full h-[30px] fixed ' src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg" alt="" />
                </div>
                <div className='sm:mt-0 mt-10 sm:ml-0 ml-2'>
                    {loading ? <Loading /> : <h1 className={`${isDarkMode ? `text-gray-200` : `text-gray-700`}`} dangerouslySetInnerHTML={{__html:resultData}}></h1>  }
                </div>
            </div>
        </div>
    )
}
function Loading(){

    return(
        <>
            <style>
            {`
                @keyframes loader {
                    0% {
                        background-position: -700px 0px;
                    }
                    100% {
                        background-position: 800px 0px;
                    }
                }
            `}
        </style>
            <div className='loader w-[100%] flex flex-col gap-2 '>
                <div className='loader w-[100%] flex flex-col gap-2'>
                <hr 
                    className='rounded-md border-none bg-sky-300' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #9ed7ff, #ffffff, #9ed7ff)',
                    }} 
                />
                <hr 
                    className='rounded-md border-none bg-sky-300' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #9ed7ff, #ffffff, #9ed7ff)',
                    }} 
                />
                <hr 
                    className='rounded-md border-none bg-sky-300' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #9ed7ff, #ffffff, #9ed7ff)',
                    }} 
                />
            </div>
            </div>
        </ >
    )
}
export default Maincontainer
