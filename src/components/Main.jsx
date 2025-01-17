import React, { useContext, useRef, useState } from "react";
import { IoApps, IoPersonCircleSharp, IoSend } from "react-icons/io5";
import { RiGeminiFill, RiBardFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardVoice, MdMenu } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { Context } from "../context/Context";

const Main = ({ toggleSidebar }) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    isExpanded,
    setIsExpanded,
  } = useContext(Context);

  const textareaRef = useRef(null);
  const responseContainerRef = useRef(null);

  const handleInputChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height to calculate new scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height dynamically

    // Set `isExpanded` based on the number of lines and `textarea.scrollHeight`
    setIsExpanded(textarea.scrollHeight > 40); // Adjust the threshold as needed
    setInput(textarea.value); // Update the input state
  };

  const handleSendClick = () => {
    onSent();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setIsExpanded(false);
    }

    // Scroll to the bottom of the response container after sending a query
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollTo({
        top: responseContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-white p-4 bg-[#1b1c1d] w-full h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-4 w-full">
        {/* Left Navbar */}
        <button
          className="text-white bg-transparent p-2 rounded-md lg:hidden"
          onClick={toggleSidebar}>
          <MdMenu size={20} />
        </button>

        <div className="flex flex-col hover:bg-[#37393b] px-2 py-1 rounded-lg cursor-pointer">
          <h1 className="text-xl flex items-center gap-2 font-medium">
            Gemini <IoMdArrowDropdown className="text-neutral-400" />
          </h1>
          <span className="text-xs text-neutral-400 font-bold">1.5 Flash</span>
        </div>

        {/* Right Navbar */}
        <div className="flex items-center gap-3">
          <a
            href="https://one.google.com/explore-plan/gemini-advanced"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#3d3f42] hover:bg-[#37393b] rounded-lg 
             sm:gap-1 sm:px-2 sm:py-1 sm:text-xs 
             lg:gap-3 lg:px-5 lg:py-2 lg:text-md">
            <RiGeminiFill
              size={16}
              className="text-gradient flex-shrink-0 sm:w-3 sm:h-3 lg:w-4 lg:h-4"
            />
            <span className="font-medium">Try Gemini Advanced</span>
          </a>

          <IoApps
            size={36}
            className="p-2 hover:bg-[#37393b] rounded-full cursor-pointer"
          />
          <IoPersonCircleSharp
            size={36}
            className="hover:bg-[#37393b] p-1 rounded-full cursor-pointer"
          />
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col gap-4 px-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        ref={responseContainerRef}>
        {showResult ? (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
            {/* User Prompt */}
            <div className="flex justify-end">
              <div className="max-w-[75%] bg-[#2b2c2e] p-3 rounded-2xl rounded-tr-none text-sm text-neutral-200">
                {recentPrompt}
              </div>
              <IoPersonCircleSharp size={32} className="ml-3" />
            </div>

            {/* Gemini Response */}
            <div className="flex justify-start">
              <RiBardFill size={30} className="mr-3 mt-2 text-gradient" />
              <div className="w-[75%]  p-4 rounded-lg text-sm text-neutral-200">
                {loading ? (
                  <div className="flex flex-col gap-2">
                    {/* Gemini Loading Animation */}
                    {[...Array(3)].map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-grow h-4 bg-gradient-to-r from-gradientStart via-white to-gradientStart rounded-lg animate-barMove bg-[length:400px_100%]"></div>
                    ))}
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className="prose max-w-full overflow-auto "></div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center h-[80vh] flex flex-col justify-center gap-4">
            <h2 className="text-5xl font-medium bg-gradient-to-r from-gradientStart via-gradientMiddle to-gradientEnd bg-clip-text text-transparent">
              Hello, I'm Gemini!
            </h2>
            <p className="text-lg text-neutral-400">
              How can I help you today?
            </p>
          </div>
        )}
      </main>

      {/* Bottom Query Bar */}
      <footer
        className={`flex items-end gap-2 p-2 mt-8 mx-auto mb-2 border border-[#37393b] w-[80%] max-w-3xl shadow-lg ${
          isExpanded && input ? "rounded-2xl" : "rounded-full"
        }`}>
        <LuImagePlus
          size={40}
          className="text-[#c4c7c5] cursor-pointer p-2 rounded-full hover:bg-[#37393b]"
        />
        <textarea
          id="query"
          ref={textareaRef}
          placeholder="Ask Gemini..."
          value={input}
          onChange={handleInputChange}
          rows={1}
          className="flex-1 bg-transparent px-4 py-2 text-white resize-none text-md outline-none overflow-auto max-h-36 transition-all duration-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        />
        {input ? (
          <IoSend
            size={40}
            onClick={handleSendClick}
            className="text-[#c4c7c5] cursor-pointer p-2 rounded-full bg-[#37393b]"
          />
        ) : (
          <MdKeyboardVoice
            size={40}
            className="text-[#c4c7c5] cursor-pointer p-2 rounded-full hover:bg-[#37393b]"
          />
        )}
      </footer>
      <span className="mx-auto">
        Developed by:{" "}
        <a href="https://www.github.com/khatrijiraj" target="_blank">
          @khatrijiraj
        </a>
      </span>
    </div>
  );
};

export default Main;
