import React from "react";
import CSS from './CSS/ipodButton.module.css';

// Functional component representing the buttons on the iPod
function IpodButton(props) {
    // Destructure props to extract necessary values
    const { wheelRef, btnFunction, selectedOption } = props;

    return (
        <>
            {/* Container for the buttons */}
            <div className={CSS.buttonSide}>
                <div className={CSS.buttonOuter} ref={wheelRef}>
                    {/* MENU button */}
                    <button className={CSS.button + ' ' + CSS.menuButton} onTouchEnd={() => btnFunction.menuOrBack()} onClick={() => btnFunction.menuOrBack()}>MENU</button>
                    {/* Backward skip button */}
                    <button className={CSS.button + ' ' + CSS.back} onTouchEnd={() => btnFunction.backwardBtn()} onClick={() => btnFunction.backwardBtn()}><i className="bi bi-skip-backward-fill"></i></button>
                    {/* Forward skip button */}
                    <button className={CSS.button + ' ' + CSS.forward} onTouchEnd={() => btnFunction.forwardBtn()} onClick={() => btnFunction.forwardBtn()}><i className="bi bi-skip-forward-fill"></i></button>
                    {/* Play/Pause button */}
                    <button className={CSS.button + ' ' + CSS.playPause} onTouchEnd={() => btnFunction.playBtn()} onClick={() => btnFunction.playBtn()}><i className="bi bi-play-fill"></i><i className="bi bi-pause-fill"></i></button>
                </div>
                {/* OK button */}
                <div className={CSS.buttonInner} onTouchEnd={() => btnFunction.okButtonHandle(selectedOption)} onClick={() => btnFunction.okButtonHandle(selectedOption)}>
                    <h1>OK</h1>
                </div>
            </div>
        </>
    );
}

// Export the IpodButton component
export default IpodButton;
