import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini";

// Create a context for the chat
export const Context = createContext();

const ContextProvider = ({ children }) => {
  // State Management
  //for user input in textarea
  const [input, setInput] = useState("");
  // for storing last prompt
  const [recentPrompt, setRecentPrompt] = useState("");
  //for tracking history prompts in history
  const [historyPrompt, setHistoryPrompt] = useState([]);
  // bool to toogle between default screen or result screen
  const [showResult, setShowResult] = useState(false);
  // bool to display loading animation
  const [loading, setLoading] = useState(false);
  // storing the response data
  const [resultData, setResultData] = useState("");
  // keep track of if bar is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Resets chat states for starting a new conversation.
   */
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  /**
   * Appends the next word of the response to the result data with a delay.
   */
  const appendWordWithDelay = (index, word) => {
    setTimeout(() => {
      setResultData((prev) => prev + word);
    }, 40 * index);
  };

  /**
   * Handles sending the user prompt and processes the response.
   */
  const onSent = async (prompt) => {
    try {
      // Resetting states before processing
      setResultData("");
      setInput("");
      setLoading(true);
      setShowResult(true);

      // Determine the prompt to send
      const currentPrompt = prompt ?? input;
      setRecentPrompt(currentPrompt);

      // Send the prompt to the chat API
      const response = await runChat(currentPrompt);

      // Update history if the prompt is from input
      if (!prompt) {
        setHistoryPrompt((prev) => [...prev, input]);
      }

      // Format the response text with bold and breaks
      const formattedResponse = response
        .split("**")
        .map((segment, index) =>
          index % 2 === 1 ? `<b>${segment}</b>` : segment
        )
        .join("")
        .split("*")
        .join("</br></br>");

      // Split response into words and append them with delays
      const responseWords = formattedResponse.split(" ");
      responseWords.forEach((word, index) => {
        appendWordWithDelay(index, `${word} `);
      });

      // Reset loading and expansion states
      setLoading(false);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error sending prompt:", error.message || error);
      setLoading(false); // Ensure loading is disabled in case of an error
    }
  };

  // Context value object
  const contextValue = {
    onSent,
    historyPrompt,
    setHistoryPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    input,
    setInput,
    setIsExpanded,
    isExpanded,
    newChat,
    resultData,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
