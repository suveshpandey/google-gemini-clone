import { createContext, useState, useEffect  } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const URL = "http://localhost:3000/user";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");
    //-----------------------------
    const [signup, setSignup] = useState(false);
    const [currUsername, setCurrUsername] = useState("");
    const [userInfo, setUserInfo] = useState(false);

    //---------------------------
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [question, setQuestion] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            autoLogin(token);
        }
    }, []);

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev + nextWord)
        }, 50*index)
    }
    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
    
        const usedPrompt = prompt || input;  // Use either the passed prompt or the input
    
        setQuestion(usedPrompt);
        setRecentPrompt(usedPrompt);

        await savePromptToDatabase(usedPrompt);
        await fetchRecentPrompts();
    
        // Check if the prompt already exists in previousPrompts, and add it only if it's new
        if (!previousPrompts.includes(usedPrompt)) {
            setPreviousPrompts(prev => [...prev, usedPrompt]);  // Add the prompt to previousPrompts
        }
    
        const response = await run(usedPrompt);  // Await response from the run function

        let formattedResponse =  `<div><strong>${usedPrompt}</strong></div><div>${response.replace(/\*\*/g, "<b>").replace(/\*\*/g, "</b>")}</div><hr />`;
        setResultData(prev => prev + formattedResponse);
        
        let newResponseArray = response.split(" ");
        for(let i = 0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setResultData(response);
    
        setLoading(false);
        setInput("");  // Clear the input after sending
    }
    const savePromptToDatabase = async (prompt) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token not available. Unable to save prompt.");
            return;
        }
        try {
            await fetch(`${URL}/chats`, { // Ensure the endpoint is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ prompt }),
            });
        } catch (error) {
            console.error("Error saving prompt to database:", error);
        }
    };
    const fetchRecentPrompts = async () => {
        const token = localStorage.getItem('token');
        if(!token) return;
        try {
            const response = await fetch(`${URL}/chats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if(response.ok) setPreviousPrompts(data.chats);
            // setPreviousPrompts(data.chats || []); // Adjust based on your response structure
        } catch (error) {
            console.error("Error fetching recent prompts:", error);
        }
    };
    function EnterKeyFn(event, prompt){
        if(event.key === 'Enter'){
            onSent(prompt);
        }
    }
    const changeUserInfoVisibility = () => {
        setUserInfo(!userInfo)
    }
    const autoLogin = async (token) => {
        try {
            const response = await fetch(`${URL}/getUser`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setCurrUsername(data.userName.split(" ")[0]);
                setUsername(data.userName);
                setEmail(data.email);
                setSignup(true);
                await fetchRecentPrompts();
            } else {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Auto-login failed:", error);
            localStorage.removeItem("token");
        }
    };
    const updatePassword = async (newPassword) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token retrieved:", token); // Check token retrieval
             if (!token) {
        alert("User is not authenticated. Please log in again.");
        return;
    }
            const response = await fetch(`${URL}/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token for authorization
                },
                body: JSON.stringify({ password: newPassword })
            });
    
            const data = await response.json();
            console.log("Response data:", data); // Check response data
    
            if (response.ok) {
                alert("Password updated successfully!");
            } else {
                alert(data.message || "Password update failed.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred while updating the password.");
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        setEmail(""); 
        setUsername(""); 
        setSignup(false); 
        setPreviousPrompts([]); 
        setInput(""); 
        setResultData("");
    };
    const contextValue = {
        URL,
        signup,
        setSignup,
        email,
        setEmail,
        password,
        setPassword,
        userName,
        setUsername,
        
        currUsername,
        setCurrUsername,
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        question,
        setQuestion,
        newChat,
        EnterKeyFn,
        fetchRecentPrompts,
        savePromptToDatabase,
        userInfo,
        setUserInfo,
        changeUserInfoVisibility,
        updatePassword,
        logout
    }
    

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;