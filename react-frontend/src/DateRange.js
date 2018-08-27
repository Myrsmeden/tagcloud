import React from "react";

const DateRange = ( { setStartDate, setEndDate, fetchTags, startDate, endDate } ) => {

    return (
        <div style={styles.wrapper}>

            <div style={styles.dateWrapper}>
                <label style={styles.dateLabel}>Från</label>
                <input type={"date"}
                       style={styles.dateInput}
                       onChange={setStartDate}
                       value={startDate}
                />
            </div>

            <div style={styles.dateWrapper}>
                <label style={styles.dateLabel}>Till</label>
                <input type={"date"}
                       style={styles.dateInput}
                       onChange={setEndDate}
                       value={endDate}
                />

            </div>

            <i className={"fas fa-sync-alt party-button-hover"}
               style={styles.syncButton}
               onClick={fetchTags}
            ></i>

        </div>
    )

};

export default DateRange;

const styles = {
    wrapper: {
        width: "100%",
        position: "fixed",
        top: 0,
        left: "8%",
        padding: "16px",
        boxSizing: "border-box",
        zIndex: 100,
    },
    dateWrapper: {
        //width: "40%",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        borderRadius: "7px",
        padding: "10px",
        float: "left",
        marginRight: "1rem",
    },

    dateInput: {
        width: "100%",
        textAlign: "center",
        boxSizing: "border-box",
        border: "none",
        fontSize: ".8rem",
        backgroundColor: "none",
        fontFamily: "Montserrat, Helvetica Neue, sans-serif",
    },
    dateLabel: {
        width: "100%",
        float: "left",
        fontSize: ".8rem",
        boxSizing: "border-box",
        padding: "0 0 .5rem 0",

    },
    syncButton: {
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        borderRadius: "7px",
        padding: "25px",
        float: "left",
        fontSize: "1rem",
    }
};
