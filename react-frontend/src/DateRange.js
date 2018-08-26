import React from "react";

const DateRange = props => {

    return (
        <div style={styles.wrapper}>

            <label style={styles.dateLabel}>From</label>
            <label style={styles.dateLabel}>To</label>

            <input type={"date"}
                   style={styles.dateInput}/>
            <input type={"date"}
                   style={styles.dateInput}/>
        </div>
    )

};

export default DateRange;

const styles = {
    wrapper: {
        width: "100%",
        float: "left",
    },
  dateInput: {
      width: "50%",
      float: "left",
      boxSizing: "border-box",

  },
    dateLabel: {
        width: "50%",
        float: "left",
        boxSizing: "border-box",

    }
};