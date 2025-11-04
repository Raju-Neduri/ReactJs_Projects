import "remixicon/fonts/remixicon.css";
import "animate.css";
import AvatarCard from "./components/AvatarCard";
import data from "./data";

function App() {
  return (
    <>
      <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-transparent blur-3xl"></div>

        <AvatarCard data={data} />
      </div>
    </>
  );
}

export default App;
