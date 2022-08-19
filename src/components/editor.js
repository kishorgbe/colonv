// Load monaco editor
(function () {
  const path = require("path");
  const amdLoader = require("../node_modules/monaco-editor/min/vs/loader.js");
  const amdRequire = amdLoader.require;

  function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, "/");
    if (pathName.length > 0 && pathName.charAt(0) !== "/") {
      pathName = "/" + pathName;
    }
    return encodeURI("file://" + pathName);
  }

  amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, "../node_modules/monaco-editor/min"))
  });

  // workaround monaco-css not understanding the environment
  self.module = undefined;

  amdRequire(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("monaco-editor"), {
      value: ["// Happy coding :V 🖤", "", ""].join("\n"),
      language: "javascript",
      theme: "vs-light",
      automaticLayout: true,
      scrollBeyondLastLine: false,
      fontFamily: "Fira Code",
      fontSize: "16px",
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true,
      minimap: {
        enabled: false
      }
    });

    editor.addAction({
      id: "execute-code",
      label: "Run",
      keybindings: [monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter)],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.0,
      run: function () {
        eval(editor.getValue());
      }
    });
  });
})();
