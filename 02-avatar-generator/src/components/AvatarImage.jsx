function AvatarImage({ src }) {
  return (
    <img
      src={src || "./BoyImage.png"}
      alt="avatar"
      className="h-32 w-32 rounded-full border-4 border-slate-900 shadow-lg object-cover"
    />
  );
}

export default AvatarImage;
