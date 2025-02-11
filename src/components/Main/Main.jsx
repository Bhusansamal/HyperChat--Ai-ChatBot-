import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

export default function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    setShowResult,
    setResultData,
    loading,
    resultData,
    setPrevPrompts,
    setInput,
    input,
    setRecentPrompt,
  } = useContext(Context);

  const cardData = [
    {
      text: "Briefly summarize this concept: Greenhouse Farming",
      icon: assets.compass_icon,
    },
    {
      text: "Briefly summarize this concept: urban planning",
      icon: assets.bulb_icon,
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: assets.message_icon,
    },
    {
      text: "How many states are there in India ?",
      icon: assets.code_icon,
    },
  ];

  return (
    <div className="main">
      <div className="nav">
        <p>HyperChat</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello. User</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => {
                    setShowResult(true); 
                    setResultData(""); 
                    setRecentPrompt(card.text)
                    setPrevPrompts((prev) => [...prev, card.text]); 
                    onSent(card.text); 
                  }}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt="" />
                </div>
              ))}
            </div>
            
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  {" "}
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                onClick={() => {
                  setInput("");
                  onSent();
                }}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="bottom-info">
            HyperChat may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}
