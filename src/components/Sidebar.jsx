import React, { useContext, useState } from "react";
import {
  MdMenu,
  MdOutlineAdd,
  MdHelpOutline,
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlineChatBubbleOutline,
} from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiVipDiamondLine } from "react-icons/ri";
import { Context } from "../context/Context";

const SidebarItem = ({ icon: Icon, label, extended }) => (
  <div className="flex w-full items-center gap-3 px-3 py-2 cursor-pointer rounded-full hover:bg-[#37393b]">
    <Icon size={20} className="text-[#c4c7c5] flex-shrink-0" />
    {extended && <span className="text-sm text-white">{label}</span>}
  </div>
);

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // For larger sceen devices
  const [showAll, setShowAll] = useState(false); // For "Show More" toggle
  const { onSent, historyPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  //only displaying 5 recent chats
  const displayedPrompts = showAll ? historyPrompt : historyPrompt.slice(0, 5);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#282a2c] text-white z-50 transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${isCollapsed ? "w-[20%] lg:w-[5%]" : "w-[70%] lg:w-[26%]"}`}>
      <div className="flex flex-col items-start justify-between w-full h-[100vh]">
        {/* Top Section */}
        <div className="flex flex-col px-4 w-full">
          {/* Close Button for small devices */}
          <button
            className="p-2 text-[#c4c7c5] mt-6 w-fit rounded-full hover:bg-[#37393b] lg:hidden"
            onClick={closeSidebar}>
            <MdMenu size={20} className="flex-shrink-0" />
          </button>

          {/* Toggle Button for large devices */}
          <button
            className="mt-4 p-2 max-w-fit text-[#c4c7c5] rounded-full hover:bg-[#37393b] hidden lg:block"
            onClick={() => setIsCollapsed(!isCollapsed)}>
            <MdMenu size={20} className="flex-shrink-0" />
          </button>

          {/* New Chat Button */}
          <button
            className={`flex items-center max-w-fit gap-3 bg-[#202123] text-[#747577] rounded-full hover:bg-[#37393b] mt-12 ${
              isCollapsed ? "justify-center p-2" : "p-2"
            }`}
            onClick={() => newChat()}>
            <MdOutlineAdd size={20} />
            {!isCollapsed && (
              <span className="text-sm font-bold align-top mx-2">New chat</span>
            )}
          </button>

          {/* Recent Section */}
          {!isCollapsed && (
            <div className="flex-1 mt-4">
              <span className="text-sm font-semibold text-white">Recent</span>
              <div
                className={`mt-3 max-h-[40vh] overflow-hidden transition-all duration-300 ${
                  showAll ? "overflow-y-scroll" : "overflow-hidden"
                } [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
                {displayedPrompts.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 w-full hover:text-white mb-0.5 cursor-pointer hover:bg-[#37393b] rounded-full">
                    <span
                      onClick={() => loadPrompt(item)}
                      className="flex items-center gap-3 text-sm font-medium text-[#a2a9b0] hover:text-white truncate">
                      <MdOutlineChatBubbleOutline size={14} />
                      {item.length > 24 ? `${item.slice(0, 24)}...` : item}
                    </span>
                  </button>
                ))}
              </div>

              {/* Show More Button */}
              {historyPrompt.length > 5 && (
                <button
                  className="flex items-center gap-2 p-2 mt-5 text-xs font-bold text-[#747577] hover:text-white hover:bg-[#37393b] rounded-full w-full"
                  onClick={() => setShowAll(!showAll)}>
                  {showAll ? (
                    <IoIosArrowUp size={14} />
                  ) : (
                    <IoIosArrowDown size={14} />
                  )}
                  {showAll ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start gap-1 mb-4 w-full px-4">
          <SidebarItem
            icon={RiVipDiamondLine}
            label="Gem manager"
            extended={!isCollapsed}
          />
          <SidebarItem
            icon={MdHelpOutline}
            label="Help"
            extended={!isCollapsed}
          />
          <SidebarItem
            icon={MdOutlineHistory}
            label="Activity"
            extended={!isCollapsed}
          />
          <SidebarItem
            icon={MdOutlineSettings}
            label="Settings"
            extended={!isCollapsed}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
