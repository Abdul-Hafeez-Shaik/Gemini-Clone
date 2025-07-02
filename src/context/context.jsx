import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const context = createContext();

const contextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev+nextWord)
        }, 75*index)

    }
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    
    const onSent = async(prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        }else{
            setPreviousPrompts(prev => [...prev, input])
            setRecentPrompt(input);
            response = await runChat(input)
        }
        let responseArray = response.split("**")
        let newArray = "";
        for (let i = 0; i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newArray += responseArray[i]
            }else{
                newArray += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newArray2 = newArray.split("*").join("<br/>")
        let newResponseArray = newArray2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ")
        }
        // console.log(response);
        // setResultData(response);
        // setResultData(newArray2);
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    }

    return(
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default contextProvider;