import React from 'react';
import logo from './logo.svg';
import './App.css';
import {parse_fml_emdis, displayDiff, compareEmdis} from './Parser.js';
import Textarea from 'react-textarea-autosize';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val1: "DONOR_CB /FIELD\n P_ID, D_ID, D_A1: \"123jklds\", \"gjklsda321\", \"02:01\" ",
            val2: "DONOR_CB /FIELD P_ID\n, D_ID : \"3jklds\", \"gjklsda321\";",
            difference: ""
        };
    }

    handleInputOneChange(event) {
        this.setState({val1:event.target.value});
    }

    handleInputTwoChange(event) {
        this.setState({val2:event.target.value});
    }

    updateDifference(){
        var emdis1 = parse_fml_emdis(this.state.val1);
        var emdis2 = parse_fml_emdis(this.state.val2);
        var diff = compareEmdis(emdis1, emdis2);
        this.setState({difference: displayDiff(diff)});
    }

    render() {
        return (
                <div>
                <Textarea type = "text" name = "fml message" value = {this.state.val1} onChange = {this.handleInputOneChange.bind(this)}/>
                <Textarea type = "text" name = "fml message 2" value = {this.state.val2} onChange = {this.handleInputTwoChange.bind(this)}/>
                <button onClick = {this.updateDifference.bind(this)} >
                compare
            </button>
                <div className = "display-linebreak">{this.state.difference}</div>
                </div>
        );
    };
}

export default App;
