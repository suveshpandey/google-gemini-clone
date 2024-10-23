import { createContext, useState  } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [question, setQuestion] = useState("");

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
    
        // Check if the prompt already exists in previousPrompts, and add it only if it's new
        if (!previousPrompts.includes(usedPrompt)) {
            setPreviousPrompts(prev => [...prev, usedPrompt]);  // Add the prompt to previousPrompts
        }
    
        const response = await run(usedPrompt);  // Await response from the run function
    
        let responseArray = response.split("**");
        let newResponse = "";
    
        // Format the response with line breaks and bold text
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<br />" + "<b>" + responseArray[i] + "</b>";
            }
        }
    
        let newResponse2 = newResponse.split("*").join("</br>");
    
        // Split the response into words and delay the display
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    
        setLoading(false);
        setInput("");  // Clear the input after sending
    };
    
    function EnterKeyFn(event, prompt){
        if(event.key === 'Enter'){
            onSent(prompt);
        }
    }
    
    const contextValue = {
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
        EnterKeyFn
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;