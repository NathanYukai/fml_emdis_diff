import React from 'react';
import './App.css';
import { parse_fml_emdis, compareListOfEmdis, displayListOfDiffs } from './Parser.js';
import Textarea from 'react-textarea-autosize';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input1: "DONOR_CB /FIELD\n P_ID, D_ID, D_A1: \"123jklds\", \"gjklsda321\", \"02:01\" ",
            input2: "DONOR_CB /FIELD P_ID\n, D_ID : \"3jklds\", \"gjklsda321\";",
            difference: ""
        };
    }

    handleInputOneChange(event) {
        this.setState({ input1: event.target.value });
    }

    handleInputTwoChange(event) {
        this.setState({ input2: event.target.value });
    }

    updateDifference() {
        var emdis1 = parse_fml_emdis(this.state.input1);
        var emdis2 = parse_fml_emdis(this.state.input2);
        var diff = compareListOfEmdis(emdis1, emdis2);
        this.setState({ difference: displayListOfDiffs(diff) });
    }

    render() {
        return (
            <div>
                <Textarea className="emdisInput" type="text" name="fml message" value={this.state.input1} onChange={this.handleInputOneChange.bind(this)} />
                <Textarea className="emdisInput" type="text" name="fml message 2" value={this.state.input2} onChange={this.handleInputTwoChange.bind(this)} />
                <button onClick={this.updateDifference.bind(this)} >
                    compare
            </button>
                <div className="display-linebreak">{this.state.difference}</div>
            </div>
        );
    };
}

export default App;
