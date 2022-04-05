import { FC } from "react";
import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { loadCodeMirrorPresets } from "../../../libs/load-code-mirror";

// invoking to load all necessary import for code-mirror to inherit language(mode) & theme support.
loadCodeMirrorPresets();

const Editor: FC<{
  config: { mode: string; theme: string };
  setCode: any;
}> = ({ config, setCode }) => {
  const options = {
    lineNumbers: false,
    mode: config.mode ? config.mode : "plaintext",
    theme: config.theme,
    scrollbarStyle: null,
    viewportMargin: Infinity,
    lineWrapping: false,
    smartIndent: true,
    inputStyle: "contenteditable",
    extraKeys: {
      "Shift-Tab": "indentLess",
    },
    showInvisibles: true,
    autoCloseBrackets: true,
  };
  return (
    <div className="w-full h-full rounded-xl">
      {typeof window !== "undefined" &&
        typeof window.navigator !== "undefined" && (
          <CodeMirror
            value=""
            className="CodeMirror mx-2"
            options={options}
            onChange={(editor, data, value) => {
              setCode(value);
            }}
          />
        )}
    </div>
  );
};

export { Editor };
