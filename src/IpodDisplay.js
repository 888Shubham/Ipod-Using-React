import React from "react";
import Menu from "./Menu.js";
import Song from "./Song.js";
import SinglePage from "./SinglePage.js";
import ArrayList from "./ArrayList.js";
import CSS from "./CSS/ipodDisplay.module.css";

// Class component representing the display area of the iPod
export default class IpodDisplay extends React.Component {
    constructor() {
        super();
        // Initialize state with current time
        this.state = {
            time: "00:00:00"
        };
    }

    // Lifecycle method called after component mounts
    componentDidMount() {
        // Update time every second
        setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000);
    }

    render() {
        // Destructure props to extract necessary values
        const { currentSong, singlePage, selectedMenu } = this.props;
        // Get the name of the current menu
        const menuName = Object.keys(ArrayList)[selectedMenu];
        // Check if the current menu is the "Songs" menu and it's a single page
        const isSongMenu = (menuName === "Songs" && singlePage);

        return (
            <>
                <div className={CSS.displaySide}>
                    {/* Navigation bar */}
                    <div className={CSS.navBar}>
                        <div className={CSS.left}>
                            {/* Display current time */}
                            <h3>{this.state.time}</h3>
                        </div>
                        <div className={CSS.right}>
                            {/* Icons for settings and battery */}
                            <img src="https://cdn-icons-png.flaticon.com/512/747/747568.png" alt="" />
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/9990/9990603.png" alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Conditional rendering based on the state of currentSong and singlePage */}
                    {!currentSong.paused || isSongMenu ? <Song {...this.props} /> : !singlePage ? <Menu {...this.props} /> : <SinglePage {...this.props} />}
                </div>
            </>
        );
    }
}
