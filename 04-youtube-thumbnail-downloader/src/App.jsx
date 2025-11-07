import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";

const sizes = [
  { key: "maxresdefault", label: "Max (HD)", dims: "1280×720" },
  { key: "sddefault", label: "SD", dims: "640×480" },
  { key: "hqdefault", label: "HQ", dims: "480×360" },
  { key: "mqdefault", label: "MQ", dims: "320×180" },
  { key: "default", label: "Low", dims: "120×90" },
];

function extractYouTubeId(input) {
  if (!input) return "";
  const trimmed = input.trim();

  // If they paste a raw ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace("www.", "");

    // youtu.be/<id>
    if (host === "youtu.be") return u.pathname.slice(1);

    // youtube.com or youtube-nocookie.com
    if (
      host.includes("youtube.com") ||
      host.includes("youtube-nocookie.com") ||
      host.includes("m.youtube.com")
    ) {
      const v = u.searchParams.get("v");
      if (v) return v;

      const parts = u.pathname.split("/").filter(Boolean);
      // /embed/<id> or /shorts/<id>
      if ((parts[0] === "embed" || parts[0] === "shorts") && parts[1]) {
        return parts[1];
      }
    }
  } catch {
    // Not a URL, ignore
  }
  return "";
}

// NEW: ThumbnailCard component to handle image loading and visibility.
// This component will hide itself if the thumbnail image fails to load.
function ThumbnailCard({ videoId, size }) {
  const [isVisible, setIsVisible] = useState(true);

  const imageUrlKey = size.key.startsWith("maxresdefault")
    ? "maxresdefault"
    : size.key;

  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/${imageUrlKey}.jpg`;

  const handleImageDownload = async () => {
    try {
      // Fetch the image data.
      const response = await fetch(thumbUrl);
      if (!response.ok) throw new Error("Image could not be fetched.");
      const blob = await response.blob();

      // Create a temporary link element to trigger the download.
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `youtube-${videoId}-${size.key}.jpg`;

      // Append to the body, click, and then remove the link.
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL to free up memory.
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download image:", error);
      // As a fallback, just open the image in a new tab if the download script fails.
      window.open(thumbUrl, "_blank");
    }
  };

  // If the image fails to load, we hide the component entirely.

  if (!isVisible) {
    return null;
  }

  return (
    <div className="group rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
      {/* ADDED: onClick handler, cursor-pointer class, and title attribute. */}
      <div
        className="aspect-video overflow-hidden cursor-pointer"
        onClick={handleImageDownload}
        title={`Download ${size.label} thumbnail`}
      >
        <img
          src={thumbUrl}
          alt={`${size.label} thumbnail`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setIsVisible(false)}
        />
      </div>
      <div className="p-3 flex items-center justify-between text-sm">
        <div className="text-neutral-300">
          <span className="font-medium">{size.label}</span>
          <span className="ml-2 text-neutral-400">{size.dims}</span>
        </div>
        {/* The original download link remains as a secondary option. */}
        <a
          href={thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
          download={`youtube-${videoId}-${size.key}.jpg`}
          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
          // Prevents the click from bubbling up to the div's onClick handler.
          onClick={(e) => e.stopPropagation()}
        >
          <i className="ri-download-2-line" />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}

function App() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractYouTubeId(url);
    if (!id) return;
    setVideoId(id);
    setPreviewSrc(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  };

  const handlePreviewError = () => {
    // Fallback if max-res isn't available
    if (videoId) {
      setPreviewSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    }
  };

  const isValid = Boolean(extractYouTubeId(url));

  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-950 text-white">
      {/* Decorative glow */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-sky-500/20 blur-3xl rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-14">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 animate__animated animate__fadeInDown">
            <i className="ri-youtube-fill text-red-500" />
            YouTube Thumbnail Downloader
          </div>

          <h1 className="m-8 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent animate__animated animate__fadeInDown">
            Grab thumbnails in seconds
          </h1>
          <p className="mt-3 text-neutral-300 animate__animated animate__fadeIn">
            Paste a YouTube URL to preview and download thumbnails in multiple
            sizes.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 animate__animated animate__fadeInUp animate__faster"
          >
            <div className="relative flex-1">
              <i className="ri-link-m absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a YouTube video URL"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/70 border border-neutral-700 text-white placeholder-neutral-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition"
                aria-label="YouTube video URL"
              />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-semibold shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-search-line" />
              Get thumbnails
            </button>
          </form>
        </div>

        {videoId && (
          <section className="mt-10 animate__animated animate__fadeIn">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
              {/* Live preview */}
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-900">
                <img
                  src={previewSrc}
                  onError={handlePreviewError}
                  alt="Video thumbnail preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  // Add a key to force re-render when the videoId changes
                  key={videoId}
                />
              </div>

              {/* Sizes grid - Now using the ThumbnailCard component */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
                {sizes.map((s) => (
                  <ThumbnailCard key={s.key} videoId={videoId} size={s} />
                ))}
              </div>

              {/* REMOVED: The tip about broken images is no longer needed. */}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
