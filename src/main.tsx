import {render} from "solid-js/web";
import App from "./App/App.tsx";

window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")!;
    render(()=><App/>, root);
})