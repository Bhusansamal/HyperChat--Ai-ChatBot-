import React, { useContext, useState } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

export default function SideBar() {
  const [extended, setExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    setInput,
    setShowResult,
    setResultData,
    
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleNewChat = () => {
    setRecentPrompt("");
    setInput("");
    setShowResult(false);
    setResultData("");
    setExtended(false);
  };

  return (
    <>
      {/* Always visible menu icon */}
      <img
        onClick={() => setExtended((prev) => !prev)}
        className="menu"
        src={assets.menu_icon}
        alt="Menu"
      />

      {/* Overlay to close sidebar when clicking outside */}
      {extended && <div className="overlay" onClick={() => setExtended(false)}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${extended ? "expanded" : ""}`}>
        <div className="top">
          <div className="new-chat" onClick={handleNewChat}>
            <img src={assets.plus_icon} alt="New Chat" />
            {extended ? <p>New Chat</p> : null}
          </div>

          {extended && (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="Message" />
                  <p>{item.slice(0, 30)} ...</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {extended && (
          <div className="bottom">
            <div className="bottom-item recent-entry">
              <img src={assets.question_icon} alt="Help" />
              <p>Help</p>
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.history_icon} alt="Activities" />
              <p>Activities</p>
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.setting_icon} alt="Settings" />
              <p>Settings</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
