import React from "react";
import PartyButton from "./PartyButton";
import { getPartyProperties } from "./utils/partyProperties";

const PartyButtons = ({setParty, selectedParty}) => {

    const parties = getPartyProperties();

    return (
        <div style={styles.wrapper}>
            <p style={{ textAlign: "center" }}>
                {parties.map( party => (
                    <PartyButton party={party} setParty={setParty} selectedParty={selectedParty}/>
                ) )}
            </p>
        </div>
    )
};

export default PartyButtons;

const styles = {
    wrapper: {
        position: "fixed",
        width: "10%",
        left: 0,
        top: 0,
    },

};
