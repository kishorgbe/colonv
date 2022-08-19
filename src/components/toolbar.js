// const electron = require("electron");
const toolbarTemplate = document.createElement("template");

// Template
toolbarTemplate.innerHTML = `
<link rel="stylesheet" href="../src/styles/toolbar.css"/>
<section class="tool-bar">
  <div class="left">
    <ul class="ctrl-btns">
      <li class="close" id="close"></li>
      <li class="minimize" id="minimize"></li>
      <li class="maximize" id="maximize"></li>
    </ul>
    <div class="actions">
      <button class="execute" id="execute-code" title="Execute">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Run
        </button>
    </div>
  </div>
  <div class="right">
    <div class="actions">
      <button class="font-size-dec" id="font-size-dec" title="Decrease font size">
          <span>A<sup>-</sup></span>
      </button>
      <button class="font-size-inc" id="font-size-inc" title="Increase font size">
         <span>A<sup>+</sup></span>
      </button>
      <button class="clipboard" id="clipboard" title="Copy">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
      </button>
      <button class="format" id="format-code" title="Format Code">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
      </button>
      <button class="console" id="open-console" title="Open Console">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-terminal"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
      </button>
      <button class="delete" id="delete-code" title="Delete Code">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
      <button class="github" id="github" title="Source Code">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374957" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </button>
    </div>
  </div>
</section>
`;

class ToolBar extends HTMLElement {
  constructor() {
    super();
    this.fontSize = 16;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(toolbarTemplate.content.cloneNode(true));

    // Close the application
    const closeCtrl = this.shadowRoot.getElementById("close");
    closeCtrl.addEventListener("click", () => window.api.closeApp());

    // Minimize the application
    const minimizeCtrl = this.shadowRoot.getElementById("minimize");
    minimizeCtrl.addEventListener("click", () => window.api.minimizeApp());

    // Maximize the application
    const maximizeCtrl = this.shadowRoot.getElementById("maximize");
    maximizeCtrl.addEventListener("click", () => window.api.maximizeApp());

    // Add event listeners for execute button.
    const executeBtn = this.shadowRoot.getElementById("execute-code");
    executeBtn.addEventListener("click", () => eval(editor.getValue()));

    // Add event listeners for delete button.
    const deleteBtn = this.shadowRoot.getElementById("delete-code");
    deleteBtn.addEventListener("click", () => editor.setValue(""));

    // Add event listeners for format code button.
    const formatBtn = this.shadowRoot.getElementById("format-code");
    formatBtn.addEventListener("click", () => editor.getAction("editor.action.formatDocument").run());

    // Add event listeners for save code button.
    const copyBtn = this.shadowRoot.getElementById("clipboard");
    copyBtn.addEventListener("click", () => window.api.copyCode(editor.getValue()));

    // Add event listeners for open dev console button
    const consoleBtn = this.shadowRoot.getElementById("open-console");
    consoleBtn.addEventListener("click", () => window.api.openConsole());

    // Increase font size
    const fontIncBtn = this.shadowRoot.getElementById("font-size-inc");
    fontIncBtn.addEventListener("click", () => editor.updateOptions({ fontSize: `${++this.fontSize}px` }));

    // Decrease font size
    const fontDecBtn = this.shadowRoot.getElementById("font-size-dec");
    fontDecBtn.addEventListener("click", () => editor.updateOptions({ fontSize: `${--this.fontSize}px` }));
  }
}

window.customElements.define("tool-bar", ToolBar);
