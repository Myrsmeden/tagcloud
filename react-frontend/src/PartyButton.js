import React from "react";

const PartyButton = ( { party, setParty, selectedParty } ) => {

    return (
        <span style={styles.wrapper}>
            <img style={party.id === selectedParty ? { ...styles.logo, ...styles.selected } : styles.logo}
                 className={"party-button-hover"}
                 src={party.logo}
                 onClick={() => {
                     setParty( party.id )
                 }}
            />
        </span>
    )

};

export default PartyButton;

const styles = {
    wrapper: {
        boxSizing: "border-box",
        padding: "1rem",
    },
    selected: {
        backgroundColor: "#ffffff",
        border: "2px solid orange",
        cursor: "pointer",
        color: "orange",
    },
    logo: {
        backgroundColor: "#f9f9f9",
        width: "4rem",
        padding: "1rem",
        boxSizing: "border-box",
        borderRadius: "7px",
    }
};
