import React from 'react'

import { IoGlobeOutline } from "react-icons/io5";
import { TbWriting } from "react-icons/tb";
import { MdFlightTakeoff } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";

import { Context } from '../context/Context'
import { useContext } from 'react';

const Maincontainer = ({extended, setExtended}) => {
    
    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput, inputState, question, setQuestion} = useContext(Context)

    return (
            <div className={`${extended ? `w-[80%]` : `w-[80%]`} 2xl:w-[65%]  h-[90vh] grid grid-rows-[75%_25%] mx-auto `}>
                {showResult ? <GetResult question={question} resultData={resultData} loading={loading} /> : <Greetings /> }
                <div id="input-section" className=''>
                    <div className='w-[100%] h-auto rounded-full flex flex-col items-center justify-center mt-5 '>
                        <div className='w-[100%] h-[65px] rounded-full grid grid-cols-[90%_10%] items-center justify-center'>
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Ask Gemini' className='h-[100%] w-[100%] bg-slate-200 rounded-l-full outline-none px-10 text-lg text-gray-700 ' />
                            <button onClick={()=>onSent(input)} className='flex items-center justify-center bg-slate-200 h-[100%] w-[100%] rounded-r-full '><VscSend  className='w-[40px] h-[40px] hover:bg-slate-300 rounded-full p-2 transition-colors duration-300 ' /></button>
                        </div>
                        <p className='text-center mt-5 font-thin text-sm'>Gemini can make mistakes, so double-check it</p>
                    </div>
                </div>
            </div>
    )
}
function Greetings(){
    return(
        <>
            <div>
                <div id="greet" className='w-[100%] py-10 px-2 '>
                        <p className='text-5xl font-bold bg-gradient-to-r from-blue-500 to-red-500 via-red-500 text-transparent bg-clip-text'>Hello, Suvesh</p>
                        <p className='text-5xl font-bold text-slate-400 opacity-55 mt-4'>How can I help you today?</p>
                </div>
                <div id="cards" className='w-[100%] px-2 flex justify-between mt-10 '>
                    <div className='w-[200px] h-[200px] bg-blue-100  opacity-70 p-3 rounded-md flex flex-col justify-between '>
                        <p>Quiz me about different kinds of sports</p>
                        <div className='flex justify-end '><IoGlobeOutline   className='w-[30px] h-[30px] ' /></div>
                    </div>
                    <div className='w-[200px] h-[200px] bg-blue-100  opacity-70 p-3 rounded-md flex flex-col justify-between '>
                        <p>Write a letter to my landlord about a broken appliance</p>
                        <div className='flex justify-end '><TbWriting   className='w-[30px] h-[30px] ' /></div>
                    </div>
                    <div className='w-[200px] h-[200px] bg-blue-100  opacity-70 p-3 rounded-md flex flex-col justify-between '>
                        <p>Find flights and weather for an upcoming trip</p>
                        <div className='flex justify-end '><MdFlightTakeoff   className='w-[30px] h-[30px] ' /></div>
                    </div>
                    <div className='w-[200px] h-[200px] bg-blue-100  opacity-70 p-3 rounded-md flex flex-col justify-between '>
                        <p>What's the difference between oat milk and almond milk?</p>
                        <div className='flex justify-end '><TbBulb   className='w-[30px] h-[30px] ' /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
function GetResult({question, resultData, loading}){
    return (
        <div className='h-[100%] grid grid-rows-[10%_auto] py-5 px-10 '>
            <div className='flex w-[100%]'>
                <img className='rounded-full h-[30px] ' src="https://media.licdn.com/dms/image/v2/D4D03AQHO2aaVD-NAXA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718271118163?e=1735171200&v=beta&t=0d98Q-8Si6hqbGk15RDvOz9o-L0UFWjaQOuvZ-dD--g" alt="" />
                <h1 className='ml-3 text-gray-700 font-semibold '>{question}</h1>
            </div>
            <div id='result-data' className=' w-[100%] h-[100%] overflow-y-auto grid grid-cols-[8%_auto] ' style={{overflowY: 'auto', scrollbarWidth: 'none'}}>
                <div>
                    <img className='rounded-full h-[30px] fixed ' src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg" alt="" />
                </div>
                <div>
                    {loading ? <Loading /> : <h1 className=' text-gray-700 ' dangerouslySetInnerHTML={{__html:resultData}}></h1>  }
                    
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
