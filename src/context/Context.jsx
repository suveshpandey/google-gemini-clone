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