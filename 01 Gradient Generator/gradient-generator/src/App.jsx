import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

// --- Helper Icons ---
const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.37 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const CopyIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CHEVRON_DOWN_SVG = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2.2' stroke='gray'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3e%3c/svg%3e")`;

function App() {
  const [num, setNum] = useState("100");
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  // Generate random color
  const getHexColorCode = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  // Build gradient CSS
  const buildGradient = (variant, color1, color2, deg) =>
    variant === "radial"
      ? `radial-gradient(circle, ${color1}, ${color2})`
      : `linear-gradient(${deg}deg, ${color1}, ${color2})`;

  // Generate gradient list
  const generateGradients = (count = 100, variant = "linear") =>
    Array.from({ length: count }, () => {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const deg = Math.floor(Math.random() * 360);
      return {
        id: crypto.randomUUID(),
        css: buildGradient(variant, color1, color2, deg),
        color1,
        color2,
        degree: deg,
        type: variant,
      };
    });

  const safeCount = useMemo(() => {
    const n = parseInt(num, 10);
    return isNaN(n) ? 0 : Math.min(Math.max(n, 0), 500);
  }, [num]);

  useEffect(() => {
    setGradients(generateGradients(safeCount, type));
  }, [safeCount, type]);

  const handleCopy = async (item) => {
    const cssToCopy = `background: ${item.css};`;
    try {
      await navigator.clipboard.writeText(cssToCopy);
      toast.success("Copied CSS to clipboard!", { duration: 1500 });
    } catch {
      toast.error("Failed to copy CSS.");
    }
  };

  const handleCopyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      toast.success(`Copied color ${color.toUpperCase()}`, { duration: 1500 });
    } catch {
      toast.error("Failed to copy color.");
    }
  };

  const handleRegenerate = () => {
    setGradients(generateGradients(safeCount, type));
    toast("Generated new gradients ✨", { duration: 1000 });
  };

  const handleNumChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) setNum(value);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "font-medium",
          style: {
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            padding: "10px 14px",
            fontSize: "0.875rem",
            borderRadius: "8px",
          },
        }}
      />

      {/* --- Header --- */}
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-title">
              Gradient Generator
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Create and explore beautiful gradients. Click any card to copy the
              CSS, or click color chips below to copy individual values.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {/* Count */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="count-input"
                className="font-medium text-sm text-slate-600"
              >
                Count
              </label>
              <input
                id="count-input"
                type="text"
                inputMode="numeric"
                className="border border-slate-300 rounded-lg w-28 h-[44px] px-3 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="100"
                value={num}
                onChange={handleNumChange}
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="type-select"
                className="font-medium text-sm text-slate-600"
              >
                Type
              </label>
              <select
                id="type-select"
                className="appearance-none border border-slate-300 rounded-lg w-32 h-[44px] px-3 pr-10 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                style={{
                  backgroundImage: CHEVRON_DOWN_SVG,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.6rem center",
                  backgroundSize: "1em",
                }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>

            {/* Regenerate button */}
            <div className="self-end">
              <button
                onClick={handleRegenerate}
                className="inline-flex items-center justify-center gap-2 h-[44px] px-4 sm:px-5 rounded-lg bg-indigo-600 text-white font-semibold text-sm shadow hover:bg-indigo-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshIcon />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Grid --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {gradients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {gradients.map((item) => (
              <GradientCard
                key={item.id}
                item={item}
                onCopyGradient={handleCopy}
                onCopyColor={handleCopyColor}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center text-slate-500">
            <h3 className="text-xl font-medium">No Gradients to Display</h3>
            <p className="mt-2">
              Try increasing the Count or clicking Regenerate.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Gradient Card ---
function GradientCard({ item, onCopyGradient, onCopyColor }) {
  return (
    <div className="group relative">
      <button
        onClick={() => onCopyGradient(item)}
        className="w-full aspect-square rounded-xl shadow-md cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2"
        style={{ background: item.css }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <div className="flex flex-col items-center text-white font-semibold">
            <CopyIcon className="w-8 h-8" />
            <span className="mt-1">Copy CSS</span>
          </div>
        </div>
      </button>

      <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-center bg-gradient-to-t from-black/20 via-black/5 to-transparent backdrop-blur-[1px] rounded-b-xl shadow-inner/5">
        <div className="flex items-center gap-2">
          <ColorBadge color={item.color1} onCopy={onCopyColor} />
          <ColorBadge color={item.color2} onCopy={onCopyColor} />
        </div>
      </div>
    </div>
  );
}

function ColorBadge({ color, onCopy }) {
  const handleCopyClick = (e) => {
    e.stopPropagation();
    onCopy(color);
  };

  return (
    <button
      type="button"
      onClick={handleCopyClick}
      className="color-chip flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-xl px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/20 shadow-sm pointer-events-auto hover:bg-white/20 transition"
    >
      <span
        className="h-3 w-3 rounded-full border border-white/50"
        style={{ backgroundColor: color }}
      />
      <span className="font-mono tracking-wider">{color.toUpperCase()}</span>
    </button>
  );
}

export default App;
