import ArrayList from "./ArrayList"; // Importing the ArrayList data
import css from "./CSS/singlePage.module.css"; // Importing the CSS module for styling

// Functional component representing a single page display on the iPod
function SinglePage(props) {
    const { selectedMenu, selectedOption } = props; // Destructuring props to extract selectedMenu and selectedOption
    const page = Object.values(ArrayList)[selectedMenu][selectedOption]; // Extracting the selected page from the ArrayList

    return (
        <>
            {/* Single page container */}
            <div className={css.container}>
                {/* Image for the single page */}
                <img className={css.image} src={page.icon} alt="" />
                {/* Heading for the single page */}
                <h2 className={css.heading}>{page.name}</h2>
            </div>
        </>
    );
}

export default SinglePage;
