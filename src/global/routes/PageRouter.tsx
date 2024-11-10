import Splash from "Pages/Splash/Splash.tsx";
import Title from "Pages/Title/Title.tsx";
import {Navigate} from "@solidjs/router";

export default[
    {
        path: "/",
        component: ()=> <Navigate href={"/splash"} />
    },
    {
        path: "/splash",
        component: Splash
    },
    {
        path: "/title",
        component: Title
    }
]