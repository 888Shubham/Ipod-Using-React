import React from "react";
import ArrayList from "./ArrayList"; // Importing the ArrayList data
import CSS from './CSS/menu.module.css'; // Importing the CSS module for styling

// Functional component representing the menu display on the iPod
function Menu(props) {
    // Destructuring props to extract selectedMenu and selectedOption
    const { selectedMenu, selectedOption } = props;
    // Extracting the array of options for the selected menu from the ArrayList
    const arrayMenu = Object.values(ArrayList)[selectedMenu];

    return (
        <>
            {/* Menu body */}
            <div className={CSS.body}>
                {/* Menu heading */}
                <div className={CSS.heading}>
                    {/* Displaying the name of the selected menu */}
                    <h1>{Object.keys(ArrayList)[selectedMenu]}</h1>
                </div>
                {/* Menu options */}
                <div className={CSS.options}>
                    {/* Mapping over the array of options to render each option */}
                    {arrayMenu.map((option, index) => (
                        <div key={index} className={`${CSS.item} ${index === selectedOption ? CSS.selectedOption : ''}`}>
                            {/* Displaying the name of the option */}
                            <div className={CSS.optionName}>
                                <h3>{option.name}</h3>
                            </div>
                            {/* Displaying the icon of the option */}
                            <div className={CSS.optionIcon}>
                                <img src={option.icon} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Menu;
