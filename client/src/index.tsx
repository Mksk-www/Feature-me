/* @refresh reload */
import { render } from "solid-js/web";
import version from "../version/version?raw";
import App from "./App/App";

window.addEventListener("load", () => {
    console.log("Page loaded. Executing scripts...");
    console.log("%c HOLD UP!", "color:#ff7a7a;background-color:#ad3e3e;font-weight:bold;font-size:5em");
    console.log("%c Please be careful when you paste anything to console.\n Attackers may steal your information.", "color:#ffa69f;background-color:#633023;font-size:16px;");
    console.log("%c Do you know what you are supposed to do with this tool? If you do, how about contributing to this project?", "color:#1189da;font-size:24px;");
    console.log(`%c Running Feature Me Alpha ${version}.Build:${0}.`, "color:#a0d6a6;background-color:#2d3c2e;font-size:16px;");

    render(() => <App />, document.getElementById("root")!);

    console.log("Initialization complete. The game is ready!");

});
