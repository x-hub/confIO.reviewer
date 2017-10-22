import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import Orientation from 'react-native-orientation';
import styles from "./style"
import {actionCreators} from "./actions.factory"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import template from "./template"

const {height} = Dimensions.get('window')

class TalkDetail extends Component {
    constructor(props) {
        super(props)
        const {slot} = this.props.navigation.state.params
        this.slot = slot;
    }

    componentWillMount() {
        Orientation.addOrientationListener(this._orientationDidChange.bind(this));
        setTimeout(() => {
            this.props.contentIsReady = true
            this.setState({contentIsReady: true})
        }, 500)
        const {speakers} = this.slot.talk;
        this.props.getSpeakersDetail(speakers || [])
    }

    componentDidMount() {

    }

    _orientationDidChange(orientation) {
        const {height} = Dimensions.get('window')
        // later
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }


    updateRating() {

    }

    render() {
        return (
            template(styles, this.props, this.slot)
        )
    }
}


function mapStateToProps(state) {
    return state.talkdetail;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);