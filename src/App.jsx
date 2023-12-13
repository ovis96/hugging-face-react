import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { runGPT2, textGen } from "./hg";
import { useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [textPrompt, setTextPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickHandler = async () => {
    setLoading(true);
    const result = await runGPT2(prompt);
    console.log({ result });
    const objectURL = URL.createObjectURL(result);
    console.log({ objectURL });
    setImgSrc(objectURL);
    setLoading(false);
  };

  const onClickGenerateText = async () => {
    setLoadingMsg(true);
    const result = await textGen(textPrompt);
    console.log({ result });
    setMessages([...messages, result.generated_text]);
    setLoadingMsg(false);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        height: "100%",
        width: "100%",
      }}
    >
      <form onSubmit={(e) => e.preventDefault()} style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridTemplateRows: "auto 400px auto auto",
            gap: "1rem",
            padding: "2rem",
            width: "100%",
          }}
        >
          <h1>Image Generation</h1>
          {!loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                style={{ width: "300px", height: "300px", alignSelf: "center" }}
                src={
                  imgSrc ||
                  "https://fastly.picsum.photos/id/927/300/300.jpg?hmac=cczzWexN5KPrmncMQRPL084bBlriYgB1oqYl9Osg5-g"
                }
                className="App-logo"
                alt="logo"
              />
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" onClick={() => onClickHandler()}>
            Run
          </button>
        </div>
      </form>
      <form onSubmit={(e) => e.preventDefault()} style={{ flex: 1 }}>
        <div
          style={{
            display: "grid",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridTemplateRows: "auto 400px auto auto",
            height: "100%",
            width: "100%",
            gap: "1rem",
            textAlign: "left",
            padding: "2rem",
          }}
        >
          <h1>Text Generation</h1>
          <div
            style={{
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "400px",
            }}
          >
            {messages.map((msg) => (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  backgroundColor: "#612262",
                }}
                key={msg}
                dangerouslySetInnerHTML={{
                  __html: msg.split("\n").join("<br />"),
                }}
              ></div>
            ))}
          </div>

          {loadingMsg && <h1>Loading...</h1>}
          <input
            type="text"
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
          />
          <button type="submit" onClick={() => onClickGenerateText()}>
            Run
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
