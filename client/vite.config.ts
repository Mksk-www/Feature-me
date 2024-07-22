import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: {
            "global": "./src/global/",
            "pages": "./src/pages/",
            "assets": "./src/assets/",
            "@": "./src/"
        }
    }
})
