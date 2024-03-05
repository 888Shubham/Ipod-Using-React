import React from "react";
import IpodDisplay from "./IpodDisplay.js";
import IpodButton from "./IpodButton.js";
import CSS from './CSS/ipod.module.css'

// Function component representing the main iPod component
function Ipod(props){
    return (<>
        <div className={CSS.container}>
            <IpodDisplay {...props} />
            <IpodButton {...props} />
        </div>
    </>)
}
export default Ipod;