import React, { Component } from 'react';
import template from './template';
import TalksData from  "app/Data/talks"
export default class Home extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.props.navigation.navigate('Detail', {slot:TalksData[1]})
    }
    render() {

        return template(this.props);
    }

}
