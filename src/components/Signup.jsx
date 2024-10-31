import React, { useContext, useState } from 'react'
import { Context } from '../context/Context';

export const Signup = () => {
    const [error, setError] = useState("");
    const [newPass, setNewPass] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign up and sign in
    const [newPassword, setNewPassword] = useState(""); // State for new password input

    const { 
        URL, 
        email, 
        setEmail, 
        password, 
        setPassword, 
        userName, 
        setUsername, 
        signup, 
        setSignup, 
        currUsername, 
        setCurrUsername, 
        fetchRecentPrompts, 
        updatePassword 
    } = useContext(Context);

    const updatingPassword = async (e) => {
        e.preventDefault();
        if (newPassword) {
            await updatePassword(newPassword); // Call context's updatePassword with the new password
            setNewPass(false);
            setNewPassword(""); // Clear the new password input
        } else {
            alert("Please enter a new password.");
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignUp ? `${URL}/signup` : `${URL}/signin`; // Choosing the endpoint based on state
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userName: isSignUp ? userName : undefined }), // Only include userName for sign up
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setCurrUsername(data.userName.split(" ")[0]);
                setUsername(data.userName);
                setSignup(true);
                alert(data.message);
                await fetchRecentPrompts();
                
            } else {
                setError(data.message);
                alert(data.message);
                return;
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            return;
        }
    };

    return (
        <div className='h-[100vh] w-[100%] bg-slate-900 text-slate-200 flex flex-col justify-center items-center'>
            <h1 
            className='text-6xl font-serif  bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent mb-5'>Gemini</h1>
            <form
                onSubmit={handleSubmit}
                className='sm:w-[30%] md:w-[600px] w-[90%] h-auto bg-slate-800 rounded-md px-3 py-10 flex flex-col items-center space-y-3 border-[1px] border-slate-500'>
                <input
                    type='text'
                    className='w-[100%] bg-slate-950 p-3 rounded-md outline-none border-[1px] border-opacity-50 hover:border-opacity-100 border-slate-400 transition-all duration-300'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='w-[100%] justify-start items-center  '>
                    <input
                        type='password'
                        className='w-[100%] bg-slate-950 p-3 rounded-md outline-none border-[1px] border-opacity-50 hover:border-opacity-100 border-slate-400 transition-all duration-300'
                        placeholder={( isSignUp ) ? `Set Your Password` : `Password`}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {isSignUp && ( // Only show the username input for sign up
                    <input
                        type='text'
                        className='w-[100%] bg-slate-950 p-3  rounded-md outline-none border-[1px] border-opacity-50 hover:border-opacity-100 border-slate-400 transition-all duration-300'
                        placeholder={isSignUp ? 'Set Your Username' : 'Username'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <button
                    type='submit'
                    className=' text-[#263045] w-[50%] py-3 rounded-full font-semibold bg-[#92b4f4] hover:bg-[#90caf9] transition-all duration-200'>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <p className='text-sm text-green-300 mt-2'>
                    {isSignUp ? "Already a user?" : "Don't have an account?"} 
                    <span className='text-blue-500 cursor-pointer' onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? " Sign in" : " Sign up"}
                    </span>
                </p>
            </form>
        </div>
    );
};


