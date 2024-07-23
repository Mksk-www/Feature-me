import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import devtools from "solid-devtools/vite";

export default defineConfig({
    plugins: [solid(),
    devtools({
        autoname: true,
        locator: {
            targetIDE: 'vscode',
            componentLocation: true,
            jsxLocation: true,
        }
    })
    ],
    resolve: {
        alias: {
            "global/": "/src/global/",
            "pages/": "/src/pages/",
            "assets/": "/src/assets/",
            "@/": "/src/"
        }
    }
})
