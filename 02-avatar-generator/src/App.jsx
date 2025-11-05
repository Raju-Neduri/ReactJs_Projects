import { useEffect, useState, useCallback, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import AvatarCard from "./components/AvatarCard";
import data from "./data";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");
  const debounceRef = useRef(null);

  const onOptionChange = (e) => setOption(e.target.value);

  const generate = () => {
    const obj = data.find((item) => item.value === option);
    if (!obj) return;

    if (option === "male" || option === "female") {
      const num = Math.floor(Math.random() * 100);
      setSrc(`${obj.url}${num}.jpg`);
    } else {
      setSrc(`${obj.url}${Date.now()}.jpg`);
    }
  };

  const debouncedGenerate = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generate, 500);
  }, [option]);

  useEffect(() => {
    generate();
  }, []);
  useEffect(() => {
    generate();
  }, [option]);

  return (
    <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-transparent blur-3xl" />
      <AvatarCard
        data={data}
        src={src}
        option={option}
        onOptionChange={onOptionChange}
        generate={debouncedGenerate}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1200,
          className: "font-medium",
          style: {
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            padding: "10px 14px",
            fontSize: "0.775rem",
            borderRadius: "8px",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#1e293b" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#1e293b" },
          },
        }}
      />
    </div>
  );
}

export default App;
