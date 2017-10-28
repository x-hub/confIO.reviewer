export default (name)=>{
    switch(name){
        case "java":
            return require("assets/trackimgs/java.png")
         case "agTest":
            return require("assets/trackimgs/agTest.png")
         case "archisec":
            return require("assets/trackimgs/archisec.png")
         case "bigd":
            return require("assets/trackimgs/bigd.png")
         case "cldops":
            return require("assets/trackimgs/cldops.png")
         case "future":
            return require("assets/trackimgs/future.png")
         case "lang":
            return require("assets/trackimgs/lang.png")
        case "mobile":
            return require("assets/trackimgs/mobile.png")
        case "plus":
            return require("assets/trackimgs/plus.png")
        case "reg":
            return require("assets/trackimgs/reg.png")
        case "wm":
            return require("assets/trackimgs/wm.png")
        default:
            return require("assets/trackimgs/java.png")

    }
}