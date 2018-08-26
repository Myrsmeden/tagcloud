import React from "react";
import WordCloud from 'react-d3-cloud';

const TagCloud = props => {

    const data = [
        {text:"filip", value:100}
    ];

    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;

    return (
        <div>
            tag cloud component

            {
                // Not sure if canvas is needed
                // <canvas ref={ node => {this.ctx = node}}></canvas>
            }
            <WordCloud
                data={data}
                fontSizeMapper={fontSizeMapper}
                rotate={rotate}
            />,
        </div>
    )
};

export default TagCloud;
