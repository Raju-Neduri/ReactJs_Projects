function AvatarControls({ data, option, onOptionChange }) {
  return (
    <div className="w-full space-y-4">
      <select
        className="bg-slate-900/60 w-full p-3 rounded-xl"
        value={option}
        onChange={onOptionChange}
      >
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
  );
}

export default AvatarControls;
