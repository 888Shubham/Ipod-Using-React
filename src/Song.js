import { Component } from "react"; // Importing Component from React
import ArrayList from "./ArrayList.js"; // Importing the ArrayList data
import CSS from "./CSS/song.module.css"; // Importing the CSS module for styling

// Class component representing the Song display on the iPod
export default class Song extends Component {
    constructor() {
        super();

        // Initializing state
        this.state = {
            seekBarValue: 0, // Current value of the seek bar
            currentTimeToBeDisplay: "0:00", // Current time to be displayed
        }
        this.musicDuration = "-:--"; // Variable to store the music duration
        this.intervalId = null; // Variable to store the interval ID for updating song state
    }

    // Lifecycle method invoked after the component is mounted
    componentDidMount() {
        this.updateSongState(this.props.currentSong);
    }

    // Lifecycle method invoked after the component is updated
    componentDidUpdate(prevProps) {
        if (prevProps.currentSongIndex !== this.props.currentSongIndex) {
            const { currentSong } = this.props;
            this.updateSongState(currentSong);
        }
    }

    // Method to update the state of the song
    updateSongState = (currentSong) => {
        const { btnFunction, currentSongIndex } = this.props;

        // Formatting music duration
        this.musicDuration = this.formatTime(ArrayList.Songs[currentSongIndex].duration);

        // Updating state with current song's seek bar value and current time
        this.setState({
            seekBarValue: currentSong.currentTime,
            currentTimeToBeDisplay: this.formatTime(currentSong.currentTime),
        });

        // Clearing previous interval
        this.intervalId ? clearInterval(this.intervalId) : this.intervalId = null;

        // Setting interval to update song state every second
        this.intervalId = setInterval(() => {
            // Checking if the song has reached its end
            if (Math.round(currentSong.currentTime) >= Math.round(currentSong.duration)) {
                clearInterval(this.intervalId); // Clearing the interval
                btnFunction.forwardBtn(); // Calling forwardBtn function to play the next song
                return;
            }

            // Updating state with current song's seek bar value and current time
            this.setState({
                seekBarValue: currentSong.currentTime,
                currentTimeToBeDisplay: this.formatTime(currentSong.currentTime),
            });
        }, 1000);
    };

    // Method to format time (convert seconds to minutes and seconds)
    formatTime = (time) => {
        let min = Math.floor(time / 60);
        if (min < 10) {
            min = `0${min}`;
        }
        let sec = Math.floor(time % 60);
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}  :  ${sec}`;
    }

    // Method to handle seek bar change
    seekBarChange = (value) => {
        const { currentSong } = this.props;

        currentSong.currentTime = value; // Setting current time of the song
        this.updateSongState(currentSong); // Updating the song state
    }

    render() {
        const { currentSongIndex } = this.props;
        const song = ArrayList.Songs[currentSongIndex]; // Getting the current song from the ArrayList

        return (
            <>
                {/* Song container */}
                <div className={CSS.musicPlayer}>
                    {/* Background image */}
                    <div className={CSS.backgroundImage} style={{ backgroundImage: `url(${song.icon})` }}></div>
                    {/* Song details */}
                    <div className={CSS.songDetails}>
                        {/* Song image */}
                        <div className={CSS.songImage}>
                            <img src={song.icon} alt="" />
                        </div>
                        {/* Song name */}
                        <div className={CSS.songName}>
                            <h3>{song.name}</h3>
                        </div>
                    </div>
                    {/* Seek bar and time */}
                    <div className={CSS.seekBarAndTime}>
                        {/* Seek bar box */}
                        <div className={CSS.seekBarBox}>
                            <input type="range" max={song.duration} value={this.state.seekBarValue} onChange={(event) => this.seekBarChange(event.target.value)} className={CSS.seekBar} />
                        </div>
                        {/* Seek time */}
                        <div className={CSS.seekTime}>
                            {/* Current time */}
                            <div className={CSS.currentTime}>
                                {this.state.currentTimeToBeDisplay}
                            </div>
                            {/* Total time */}
                            <div className={CSS.totalTime}>
                                {this.musicDuration}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
