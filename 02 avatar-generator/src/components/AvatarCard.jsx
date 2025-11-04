import AvatarImage from "./AvatarImage";
import Header from "./Header";
import AvatarControls from "./AvatarControls";

function AvatarCard({ data, src, option, onOptionChange, generate }) {
  return (
    <div className=" animate__animated animate__bounceIn relative w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 bg-white/5 p-8 flex flex-col items-center gap-1 text-center space-y-6 m-8 ">
      <AvatarImage src={src} />
      <Header />
      <AvatarControls
        data={data}
        option={option}
        onOptionChange={onOptionChange}
        src={src}
        generate={generate}
      />
    </div>
  );
}

export default AvatarCard;
