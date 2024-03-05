import React from "react";
import ArrayList from "./ArrayList";
import Ipod from "./Ipod";
import ZingTouch from 'zingtouch';
import './CSS/App.css';

export default class App extends React.Component {
  constructor() {
    super();

    // Ref for the wheel element
    this.wheelRef = React.createRef();
    // ZingTouch region instance
    this.zingtouch = null;
    // Distance for rotation gesture
    this.distance = 0;
    // Sensitivity for rotation gesture
    this.sensitivity = 25;

    // Array of songs
    this.songsArray = ArrayList.Songs;
    // Index of the current song
    this.currentSongIndex = 0;

    // Object containing button functions
    this.btnFunction = {
      menuOrBack: this.menuOrBack,
      okButtonHandle: this.okButtonHandle,
      playBtn: this.playBtn,
      forwardBtn: this.forwardBtn,
      backwardBtn: this.backwardBtn,
      seekBarChange: this.seekBarChange
    };

    // Initial state
    this.state = {
      menuQueue: [0], // Array to track menu navigation
      selectedMenu: 0, // Index of the selected menu
      selectedOption: 0, // Index of the selected option
      menuArray: Object.values(ArrayList)[0], // Current menu options
      singlePage: false, // Flag to indicate whether single page is rendered
      currentSong: new Audio(this.songsArray[0].source), // Currently selected song
    };
  }

  // Lifecycle method called after component is mounted
  componentDidMount() {
    const wheel = this.wheelRef.current;
    // Creating ZingTouch region
    this.zingtouch = new ZingTouch.Region(wheel);
    // Binding rotation gesture
    this.bindRotationGesture();
  }

  // Function to bind rotation gesture
  bindRotationGesture = () => {
    const wheel = this.wheelRef.current;
    const myGesture = new ZingTouch.Rotate();

    const menuArray = Object.values(ArrayList)[this.state.selectedMenu];

    // Binding rotation gesture event
    this.zingtouch.bind(wheel, myGesture, (event) => {
      if (!this.state.currentSong.paused) return; // If song is playing, do not perform rotation gesture

      if (Math.floor(event.detail.distanceFromOrigin) === 0) {
        this.distance = 0; // Reset distance to 0
      }

      if (Math.abs(this.distance - event.detail.distanceFromOrigin) > this.sensitivity) {
        const menuName = Object.keys(ArrayList)[this.state.selectedMenu];
        let newState;
        if (this.distance - event.detail.distanceFromOrigin < 0) {
          newState = (this.state.selectedOption + 1) % menuArray.length;
        } else {
          newState = (this.state.selectedOption - 1 + menuArray.length) % menuArray.length;
        }
        this.setState((prevState) => {
          if (menuName === "Songs") {
            this.currentSongIndex = newState;
            return {
              currentSong: new Audio(this.songsArray[newState].source),
              selectedOption: newState
            }
          } else {
            return { selectedOption: newState }
          }
        });
        this.distance = event.detail.distanceFromOrigin;
      }
    });
  };

  // Function to navigate to previous menu or go back
  menuOrBack = () => {
    let newMenuQueue = this.state.menuQueue;

    if (newMenuQueue.length === 1 || !this.state.currentSong.paused) {
      console.log(`Sorry, selected option has no effect. ${!this.state.currentSong.paused ? "Song is playing" : "You are on top"}`)
      return;
    }

    newMenuQueue.pop();
    const newSelectedMenu = newMenuQueue[newMenuQueue.length - 1];
    this.setState({
      menuQueue: newMenuQueue,
      selectedMenu: newSelectedMenu,
      selectedOption: 0,
      menuArray: Object.values(ArrayList)[newSelectedMenu],
      singlePage: false,
    })
  };

  // Function to handle OK button press
  okButtonHandle = (option) => {
    let newMenuQueue = this.state.menuQueue;
    const length = newMenuQueue.length;

    if (newMenuQueue[length - 1] === newMenuQueue[length - 2]) {
      console.log(`Sorry, selected option has no effect. ${!this.state.currentSong.paused ? "Song is playing" : "You are on root of App"}`)
      return;
    }

    const newSelectedMenu = Object.values(ArrayList)[this.state.selectedMenu][option].parentIndex;
    newMenuQueue.push(newSelectedMenu);

    if (newSelectedMenu === this.state.selectedMenu) {
      this.setState({
        singlePage: true,
        menuQueue: newMenuQueue,
        selectedMenu: newSelectedMenu,
        selectedOption: 0,
        menuArray: Object.values(ArrayList)[option],
      })
      return;
    }

    this.setState({
      singlePage: false,
      menuQueue: newMenuQueue,
      selectedMenu: newSelectedMenu,
      selectedOption: 0,
      menuArray: Object.values(ArrayList)[option],
    });
  };

  // Function to play or pause the current song
  playBtn = () => {
    if (this.state.currentSong.paused) {
      this.state.currentSong.play();
    } else {
      this.state.currentSong.pause();
    }
  };

  // Function to play the next song
  forwardBtn = () => {
    this.state.currentSong.pause();
    this.currentSongIndex = (++this.currentSongIndex % this.songsArray.length);
    const newCurrentSong = new Audio(this.songsArray[this.currentSongIndex].source);
    newCurrentSong.play();

    this.setState({
      currentSong: newCurrentSong,
    })
  };

  // Function to play the previous song
  backwardBtn = () => {
    this.state.currentSong.pause();
    this.currentSongIndex = this.currentSongIndex === 0 ? this.songsArray.length - 1 : --this.currentSongIndex;
    const newCurrentSong = new Audio(this.songsArray[this.currentSongIndex].source);
    newCurrentSong.play();

    this.setState({
      currentSong: newCurrentSong,
    })
  };

  render() {
    return (
      <>
        <Ipod
          selectedMenu={this.state.selectedMenu}
          selectedOption={this.state.selectedOption}
          singlePage={this.state.singlePage}
          currentSong={this.state.currentSong}
          currentSongIndex={this.currentSongIndex}
          btnFunction={this.btnFunction}
          wheelRef={this.wheelRef}
        />
      </>
    );
  }
}
