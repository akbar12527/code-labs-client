import { FC, useState } from "react";
import Image from "next/image";
import { CodeBlock } from "../common/editors/code-block";
import { Editor } from "../common/editors/editor";
import SideNav from "../common/SideNav/SideNav";

const Editors: FC = () => {
  const bg = "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r";

  const [blocks, SetBlocks] = useState<
    { mode: string; theme: string; language: string }[]
  >([]);

  // on click action from nav side languages options
  const onAdd = (config: { mode: string; theme: string; language: string }) => {
    const updateBlock = [...blocks, config];
    SetBlocks(updateBlock);
  };

  const renderBlocks = blocks.map((blockConfig) => {
    return <CodeBlock config={blockConfig} />;
  });

  return (
    <div className="flex">
      <SideNav onAdd={onAdd} />

      <div
        className={
          "pl-[100px] w-full h-auto min-h-screen flex flex-col p-4 gap-5 " + bg
        }
      >
        {renderBlocks}
        {renderBlocks.length <= 0 && (
          <div className="w-4/6 h-1/2 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-sublimeLight-base1 to-sublimeLight-base2 rounded-3xl">
            <Image
              src={`/animated-icons/coffee-cup.gif`}
              alt=""
              width={100}
              height={100}
            />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-delicate-base1 to-delicate-base2">
              Welcome to Code-Labs
            </h1>
            <p className="mt-6">Looks like you didn't add any editor.</p>
            <p className=" flex flex-row items-center ">
              <Image
                src={`/animated-icons/idea.gif`}
                alt=""
                width={40}
                height={40}
              />
              Try selecting your preferred language from nav bar lists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Editors };
