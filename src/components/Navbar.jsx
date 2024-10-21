import React from 'react'
import { PiDotsNineBold } from "react-icons/pi";

const Navbar = () => {
    return (
        <div className='w-[100%] h-[10vh] grid grid-cols-[30%_70%] items-center px-10 '>
            <div className='w-[100%] flex justify-start font-semibold text-xl text-gray-700 '><span className='hover:bg-slate-300 px-5 py-1 rounded-md transition-colors duration-300'>Gemini</span></div>
            <div className='w-[100%] flex justify-end items-center '>
                <div><a className='mr-4 bg-slate-300 opacity-80 px-7 py-[7px] rounded-md sm:flex hidden' href="https://one.google.com/explore-plan/gemini-advanced?utm_source=gemini&utm_medium=web&utm_campaign=sidenav_evo&g1_landing_page=65" ><img className='mr-2' src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg" alt="" />Try Gemini Advance</a></div>
                <div className='mr-3 sm:block hidden'><PiDotsNineBold className='h-[25px] w-[25px] mr-2 ' /></div>
                <div><img className='w-[30px] rounded-full ' src="https://media.licdn.com/dms/image/v2/D4D03AQHO2aaVD-NAXA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718271118163?e=1735171200&v=beta&t=0d98Q-8Si6hqbGk15RDvOz9o-L0UFWjaQOuvZ-dD--g" alt="" /></div>
            </div>
        </div>
    )
}

export default Navbar
