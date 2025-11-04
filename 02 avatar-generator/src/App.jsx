import "remixicon/fonts/remixicon.css";
import "animate.css";
import AvatarCard from "./components/AvatarCard";
import data from "./data";
import { useEffect, useState } from "react";

function App() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");

  const onOptionChange = (e) => {
    const value = e.target.value;
    setOption(value);
  };

  const generate = () => {
    const obj = data.find((item) => item.value === option);

    if (option === "male" || option === "female") {
      const randomnum = Math.floor(Math.random() * 100);
      const randomSrc = `${obj.url}${randomnum}.jpg`;
      setSrc(randomSrc);
      console.log(randomSrc);
    } else {
      const random = Date.now();
      const randomSrc = `${obj.url}${random}.jpg`;

      setSrc(randomSrc);
      console.log("Generated URL:", randomSrc);
    }
  };

  useEffect(() => {
    generate();
  }, [option]);

  return (
    <>
      <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-transparent blur-3xl"></div>

        <AvatarCard
          data={data}
          src={src}
          option={option}
          onOptionChange={onOptionChange}
          generate={generate}
        />
      </div>
    </>
  );
}

export default App;
