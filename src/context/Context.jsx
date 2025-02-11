import { createContext, useState, useMemo, useRef } from "react";
import run from "../config/api";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const responseRef = useRef(null); // Stores the latest request reference

  const delayPara = (index, nextWord, currentResponse) => {
    setTimeout(() => {
      if (responseRef.current !== currentResponse) return; // Stop old response
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const onSent = async (prompt) => {
    setResultData(""); // 🔥 Clear previous result immediately
    setLoading(true);
    setShowResult(true);

    const currentResponse = {}; // Unique object for this request
    responseRef.current = currentResponse; // Track active request

    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input);
      setPrevPrompts((prev) => [...prev, input]);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = responseArray
      .map((text, i) => (i % 2 === 1 ? `<b>${text}</b>` : text))
      .join("");

    let newResponseArray = newResponse.replace(/\*/g, "</br>").split(" ");

    newResponseArray.forEach((word, i) =>
      delayPara(i, word + " ", currentResponse)
    );

    setLoading(false);
    setInput("");
  };

  const contextValue = useMemo(
    () => ({
      prevPrompts,
      setPrevPrompts,
      recentPrompt,
      setRecentPrompt,
      showResult,
      setShowResult,
      setResultData,
      loading,
      resultData,
      input,
      setInput,
      onSent,
    }),
    [showResult, resultData, input]
  );

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
