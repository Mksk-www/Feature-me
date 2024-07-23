import { Navigate, Route } from "@solidjs/router";
import Splash from "pages/splash/Splash";
import * as solid from "solid-js";


export default () => {
    return (
        <>
            <Route path={"/"} component={()=><Navigate href={"/splash"} />} />
            <Route path={"/splash"} component={Splash} />
        </>
    )
}