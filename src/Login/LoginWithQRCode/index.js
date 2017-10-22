import React, { Component } from 'react';
import template from './template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from "./actions.factory"

function mapStateToProps(state) {
    return state.login;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
 class QRLogin extends Component{

    constructor(props) {
        super(props)
        this.navigate = props.navigation.navigate;

    }
    componentWillReceiveProps(newProps) {
        if(newProps != null){
            this.navigate('Swiper')
        }
    }
    render(){
        return template(this.props);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QRLogin);
