function App() {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-transparent blur-3xl"></div>

        <div className="relative w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 bg-white/5 p-10 flex flex-col items-center text-center space-y-6">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
            alt="avatar"
            className="h-32 w-32 rounded-full border-4 border-slate-900 shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              Avatar Generator
            </h1>
            <p className="text-slate-300">
              Generate unlimited Avatar for your website
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
