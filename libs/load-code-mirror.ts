// validation for SSR & load all code-mirror neccessary import for themes & lang support.
const loadCodeMirrorPresets = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    require("codemirror/lib/codemirror.css");
    require("codemirror/theme/panda-syntax.css");
    require("codemirror/mode/javascript/javascript.js"); // js language support
    require("codemirror/mode/python/python.js"); // python support
    require("codemirror/mode/cmake/cmake.js"); // java support
    require("codemirror/mode/clike/clike.js"); // c, c# & c++ support
  }
};

export { loadCodeMirrorPresets };
