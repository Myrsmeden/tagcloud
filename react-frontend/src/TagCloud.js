import React from "react";
import WordCloud from 'react-d3-cloud';

const TagCloud = ( { tagData } ) => {

    const fontSizeMapper = word => Math.log2( word.value ) * 5;
    const rotate = word => {
        return ( ( Math.random() * 6 ) - 3 ) * 30
    };
    //const rotate = word => 0;
    //const rotate = word => Math.sqrt( word.value );

    return (
        <div style={styles.wrapper}>
            <WordCloud
                data={tagData}
                fontSizeMapper={fontSizeMapper}
                rotate={rotate}
                font={"Montserrat"}
                height={600}
                padding={5}
                width={1000}
            />
        </div>
    )

};

export default TagCloud;

const styles = {
    wrapper: {
        width: "100%",
        float: "left",
        padding: "10% 0 0 10%",
        boxSizing: "border-box",
    }
};
