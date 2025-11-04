import "remixicon/fonts/remixicon.css";
import "animate.css";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men/",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women/",
  },
];

function App() {
  return (
    <>
      <div className="overflow-hidden relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-transparent blur-3xl"></div>

        <div className=" animate__animated animate__bounceIn relative w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 bg-white/5 p-8 flex flex-col items-center gap-1 text-center space-y-6 m-8 ">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
            alt="avatar"
            className="h-32 w-32 rounded-full border-4 border-slate-900 shadow-lg object-cover"
          />

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-wide">
              Avatar Generator
            </h1>
            <p className="text-slate-300">
              Generate unlimited Avatar for your website
            </p>
          </div>

          <div className="w-full space-y-4">
            <select className="bg-slate-900/60 w-full p-3 rounded-xl">
              {data.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="bg-slate-900/60 w-full p-4 rounded-xl text-left">
              www.google.com
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-800 text-slate-100 shadow-md transition-all duration-200 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95">
                <i className="ri-refresh-line" /> Change
              </button>
              <button className="flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-800 text-slate-100 shadow-md transition-all duration-200 hover:bg-emerald-700 hover:scale-105 hover:shadow-lg active:scale-95">
                <i className="ri-download-line" /> Download
              </button>
              <button className="flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-sky-800 text-slate-100 shadow-md transition-all duration-200 hover:bg-sky-700 hover:scale-105 hover:shadow-lg active:scale-95">
                <i className="ri-file-copy-line" /> Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
