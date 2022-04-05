import Image from "next/image";
import React, { useState } from "react";

// Types
type Props = {
  onAdd: (config: { mode: string; theme: string; language: string }) => void;
};

const SideNav = (props: Props) => {
  const [mode, setMode] = useState<string>("");

  // Tooltip Generator On Hover
  const TooltipGenerator = (title: string) => {
    return (
      <div className="bg-white shadow-md font-bold w-max py-2 px-4 absolute top-[05px] left-[60px] after:bg-white after:h-4 after:w-4 after:rotate-45 after:transform after:origin-bottom-left after:absolute after:left-[-8px] after:bottom-[50%] after:top-[50%] after:translate-y-[-95%] text-[#111] transform-all duration-200 scale-0 origin-left group-hover:scale-100 z-50">
        {title}
      </div>
    );
  };

  return (
    <div className="fixed w-20 h-screen flex flex-col items-center justify-center gap-[25px] backdrop-blur-sm bg-white/10 shadow-xl">
      <div
        className="cursor-pointer group relative"
        onClick={() => {
          // setMode("c");
          props.onAdd({ mode: "clike", theme: "panda-syntax", language: "c" });
        }}
      >
        <Image src="/sidebar-images/c.svg" alt="c" width={40} height={40} />
        {TooltipGenerator("C")}
      </div>

      <div
        className="cursor-pointer group relative"
        onClick={() => {
          setMode("cpp");
          props.onAdd({
            mode: "clike",
            theme: "panda-syntax",
            language: "cpp",
          });
        }}
      >
        <Image src="/sidebar-images/cpp.svg" alt="c" width={45} height={45} />
        {TooltipGenerator("C++")}
      </div>

      <div
        className="cursor-pointer group relative"
        onClick={() => {
          setMode("java");
          props.onAdd({
            mode: "cmake",
            theme: "panda-syntax",
            language: "java",
          });
        }}
      >
        <Image src="/sidebar-images/java.svg" alt="c" width={45} height={45} />
        {TooltipGenerator("Java")}
      </div>

      <div
        className="cursor-pointer group relative"
        onClick={() => {
          setMode("python");
          props.onAdd({
            mode: "python",
            theme: "panda-syntax",
            language: "python",
          });
        }}
      >
        <Image
          src="/sidebar-images/python.svg"
          alt="c"
          width={45}
          height={45}
        />
        {TooltipGenerator("Python")}
      </div>

      <div
        className="cursor-pointer group relative"
        onClick={() => {
          setMode("javascript");
          props.onAdd({
            mode: "javascript",
            theme: "panda-syntax",
            language: "javascript",
          });
        }}
      >
        <Image
          src="/sidebar-images/javascript.svg"
          alt="c"
          width={45}
          height={45}
        />
        {TooltipGenerator("Node.js")}
      </div>
    </div>
  );
};

export default SideNav;
