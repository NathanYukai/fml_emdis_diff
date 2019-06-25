import React from 'react';
import logo from './logo.svg';
import './App.css';
import {parse_fml_emdis, displayDiff} from './Parser.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val1: "a b c d \"E\"",
            val2: "",
            difference: "hello"
        };
    }

    handleInputOneChange(event) {
        this.setState({val1:event.target.value});
    }

    handleInputTwoChange(event) {
        this.setState({val2:event.target.value});
    }

    updateDifference(){
        this.setState({difference: displayDiff(parse_fml_emdis(this.state.val1)) });
    }

    render() {
        return (
                <div>
                <input type = "text" name = "fml message" value = {this.state.val1} onChange = {this.handleInputOneChange.bind(this)}/>
                <input type = "text" name = "fml message 2" value = {this.state.val2} onChange = {this.handleInputTwoChange.bind(this)}/>
                <button onClick = {this.updateDifference.bind(this)} >
                compare
            </button>
                <div className = "display-linebreak">{this.state.difference}</div>
                </div>
        );
    };
}

export default App;
