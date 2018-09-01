import '!style-loader!css-loader?module=false!@/style/index.css'

//import { Log } from "@uk/log"
import { history } from "@/lib"

//const log = new Log("CASH:MAIN");

console.log("Loading...");

history.listen((e)=> {
    console.log('Navigate', { path: e.pathname });
});


import "./app"
