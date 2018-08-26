import React, { Component } from 'react';
import TagCloud from "./TagCloud";
import PartyButtons from "./PartyButtons";
import DateRange from "./DateRange";

class App extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div>
                <div style={styles.tagCloud}>
                    Tagcloud
                    <TagCloud/>
                </div>
                <div style={styles.settingsWrapper}>
                    {
                        // Settings
                    }
                    <DateRange/>
                    <PartyButtons/>
                </div>
            </div>
        );
    }
}

export default App;

const styles = {
    tagCloud: {
        width: "80%",
        position: "absolute",
        left: "20%",
        top: 0,
    },
    settingsWrapper: {
        width: "20%",
        //borderRight: "1px solid rgba(0,0,0,0.1)",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "#f9f9f9",
        height: "100vh",
        background: "#C6FFDD",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #f7797d, #FBD786, #C6FFDD)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
};