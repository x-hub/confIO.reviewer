import React, { Component } from 'react';
import Animation from 'lottie-react-native';

export class AutoPlayAnimation extends Component {
    componentDidMount() {
        if(this.animation && this.animation.play) {
            this.animation.play();
        }
    }
    render() {
        const props = this.props;
        return (
            <Animation
                loop={ true }
                ref={ a => this.animation = a }
                { ...props }
            />
        );
    }
}
