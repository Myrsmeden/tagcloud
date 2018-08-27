import React, { Component } from 'react';
import TagCloud from "./TagCloud";
import PartyButtons from "./PartyButtons";
import DateRange from "./DateRange";
import { GET } from "@fippli/api-utils";

class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            partyId: 17233550,
            startDate: "2018-01-01",
            endDate: "2018-01-02",
            limit: 50,
        }
    }

    componentWillMount() {
        this.fetchTags();
    }

    buildUrl = () => {
        return `http://localhost:8080/api/1/tags?group=${this.state.partyId}&startDate=${(new Date(this.state.startDate)).toISOString()}&endDate=${(new Date(this.state.endDate)).toISOString()}&limit=${this.state.limit}`
    };

    fetchTags = () => {
        // Fetch tweets from API
        console.log( this.state );
        GET( this.buildUrl() )
        .then( response => {
            console.log( response.data )
        } )
    };

    tagData = [
        { text: "this", value: 200000 },
        { text: "is", value: 100 },
        { text: "a", value: 1000 },
        { text: "fake", value: 10 },
        { text: "tag", value: 100000 },
        { text: "cloud", value: 10000 }
    ];

    render() {
        return (
            <div>

                <PartyButtons selectedParty={this.state.partyId}
                              setParty={partyId => {
                                  this.setState( { partyId: partyId } )
                              }}/>

                <TagCloud tagData={
                    [ ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData, ...this.tagData ]}/>

                <DateRange setStartDate={event => {
                    this.setState( { startDate: event.target.value } )
                }}
                           setEndDate={event => {
                               this.setState( { endDate: event.target.value } )
                           }}
                           fetchTags={this.fetchTags}
                           startDate={this.state.startDate}
                           endDate={this.state.endDate}
                />

            </div>
        );
    }
}

export default App;
