import React from 'react'

import { IoGlobeOutline } from "react-icons/io5";
import { TbWriting } from "react-icons/tb";
import { MdFlightTakeoff } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";
import { GrStatusPlaceholderSmall } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";


import { Context } from '../context/Context'
import { useContext } from 'react';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Maincontainer = ({isDarkMode}) => {
    
    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput, inputState, question, setQuestion, currUsername, EnterKeyFn} = useContext(Context)
    function searchCards(cardQuestion){
        onSent(cardQuestion)
    }
    return (
            <div className={`sm:w-[80%] w-[100%] 2xl:w-[65%] sm:h-[90vh] h-[95vh] grid sm:grid-rows-[80%_20%] grid-rows-[90%_10%] mx-auto`}>

                {/* greetings-and-result-section */}
                <div className={`h-[100%]`}>
                    {showResult ? <GetResult question={question} resultData={resultData} loading={loading} isDarkMode={isDarkMode} /> : <Greetings isDarkMode={isDarkMode} searchCards={searchCards} currUsername={currUsername} /> }
                </div>

                {/* input-section */}
                <div id="input-section" className={`flex items-end sm:pb-3 pb-2 ${isDarkMode ? `bg-[#131314]` : `bg-white`} transition-all duration-200`}>
                    <div className='w-[100%] h-auto rounded-full flex flex-col items-center justify-center mt-1 pt-2 '>
                        <div className='sm:w-[100%] w-[95%] h-[65px] rounded-full grid sm:grid-cols-[90%_10%] grid-cols-[80%_20%] items-end justify-center'>
                            <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=>EnterKeyFn(e, input)} value={input} type="text" placeholder='Ask Gemini' className={`h-[100%] w-[100%] ${isDarkMode ? `bg-[#1f1f1f] text-slate-200` : `bg-slate-200`}  rounded-l-full outline-none sm:pl-10 pl-6 pr-2 text-lg text-gray-700 `} />
                            <button onClick={()=>onSent(input)} disabled={loading} className={`flex items-center justify-center ${isDarkMode ? `bg-[#1f1f1f] text-slate-200 ` : `bg-slate-200`} h-[100%] w-[100%] rounded-r-full `}>{loading ?  <GrStatusPlaceholderSmall /> : <VscSend  className={`w-[40px] h-[40px] text-gray-600 rounded-full p-2 transition-colors duration-300 ${isDarkMode ? `hover:bg-[#292929]` : `hover:bg-slate-300`} `}/>}</button>
                        </div>
                        <p className={`text-center mt-5  text-sm ${isDarkMode ? `text-stone-300` : `text-slate-700`}`}>Gemini can make mistakes, so double-check it</p>
                    </div>
                </div>
            </div>
    )
}
function Greetings({isDarkMode, searchCards, currUsername}){
    return(
        <>
            <div className='flex flex-col justify-center'>
                {/* greetings and name */}
                <div id="greet" className='w-[100%] py-10  sm:px-2 px-10 flex flex-col items-start '>
                        <p className='text-5xl sm:font-bold font-semibold pb-2 bg-gradient-to-r from-blue-500 to-red-500 via-red-500 text-transparent bg-clip-text'>Hello {currUsername}</p>
                        <p className='text-5xl sm:font-bold font-semibold text-slate-400 opacity-55 sm:mt-2 mt-1'>How can I help you today?</p>
                </div>
                {/* cards */}
                <div id="cards" className="sm:w-[100%] w-[350px] px-5 gap-x-2 flex flex-row sm:justify-between mt-10 mx-auto overflow-x-auto overflow-hidden">
                    <div onClick={() => searchCards("Write a program to find factorial of a number using recursion, in c++, javascript, python, java.")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f]  hover:bg-[#232323] text-slate-300` : `bg-slate-200 hover:bg-blue-100 text-gray-800`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>Write a program to find factorial of a number using recursion, in c++, javascript, python, java.</p>
                        <div className='flex justify-end'><TbBulb className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("How is blockchain technology transforming data security and pravicy?")} className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f]  hover:bg-[#232323] text-slate-300` : `bg-slate-200 hover:bg-blue-100 text-gray-800`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>How is blockchain technology transforming data security and pravicy?</p>
                        <div className='flex justify-end'><IoGlobeOutline className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("How can AI and Data Science be used to tackle real-world challenges, like climate change or healthcare?")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f]  hover:bg-[#232323] text-slate-300` : `bg-slate-200 hover:bg-blue-100 text-gray-800`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>How can AI and Data Science be used to tackle real-world challenges, like climate change or healthcare?</p>
                        <div className='flex justify-end'><TbWriting className='w-[30px] h-[30px]' /></div>
                    </div>
                    <div onClick={() => searchCards("Find flights and weather for an upcoming trip")}  className={`sm:w-[200px] min-w-[200px] h-[200px] cursor-pointer ${isDarkMode ? `bg-[#1f1f1f]  hover:bg-[#232323] text-slate-300` : `bg-slate-200 hover:bg-blue-100 text-gray-800`} opacity-90 p-3 rounded-md flex flex-col justify-between transition-all duration-200`}>
                        <p>Find flights and weather for an upcoming trip</p>
                        <div className='flex justify-end'><MdFlightTakeoff className='w-[30px] h-[30px]' /></div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
function GetResult({question, resultData, loading, isDarkMode}){
    return (
        <div className='h-[100%] flex flex-col gap-y-3 py-5 sm:px-10 px-4 pr-7 sm:overflow-y-auto 'style={{overflowY: 'auto', scrollbarWidth: 'none'}}>

            {/* userImg and question */}
            <div className='flex w-[100%] h-auto mb-1'>
                {/* <img className='rounded-full h-[33px] ' src="public/user-icon.png" alt="" /> */}
                <FaUserCircle className={`size-7 ${isDarkMode ? `text-slate-400` : `text-slate-300`}`} />
                <h1 className={`ml-3 mt-0  ${isDarkMode ? `text-gray-200` : `text-gray-700`} font-semibold `}>{question}</h1>
            </div>

            {/* //result */}
            <div id='result-data' className=' w-[100%] sm:h-auto h-[96%]  grid grid-cols-[8%_auto] sm:mt-5 sm:overflow-scroll overflow-scroll' style={{scrollbarWidth: 'none'}} >
                {/* gemini logo */}
                <div>
                    <img className='rounded-full w-[30px] ' src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg" alt="" />
                </div>
                {/* main result */}
                <div className='sm:mt-0 mt-10 sm:ml-0 ml-2'>
                    {loading ? <Loading /> : <ReactMarkdown
                            className={`${isDarkMode ? `text-gray-200` : `text-gray-700`}`}
                            children={resultData}
                            components={{
                                // This renders code blocks with syntax highlighting
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />
                    }
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
                    className='rounded-md border-none bg-sky-400' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #58b4f5, #e6cfcf, #58b4f5)',
                    }} 
                />
                <hr 
                    className='rounded-md border-none bg-sky-300' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #58b4f5, #e6cfcf, #58b4f5)',
                    }} 
                />
                <hr 
                    className='rounded-md border-none bg-sky-300' 
                    style={{
                        height: '18px',
                        backgroundSize: '700px 50px',
                        animation: 'loader 3s infinite linear',
                        backgroundImage: 'linear-gradient(to right, #58b4f5, #e6cfcf, #58b4f5)',
                    }} 
                />
            </div>
            </div>
        </ >
    )
}
export default Maincontainer;
