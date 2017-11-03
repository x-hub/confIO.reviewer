import React from 'react';
import {
    Text,
	View,
    Image,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Icon,
    Left,
    Right,
} from 'native-base'
import style from './eventDetailsDialog.style';
import Modal from 'react-native-modal';

export default (props) => {
	const { visible, onRequestClose, event } = props;
    return visible? renderModal() : <View />;
    
    function renderModal() {
        return (
            <Modal
            onModalHide={ onRequestClose }
            isVisible={ visible }
            onBackdropPress={ onRequestClose }
            style={ style.modal }
            >
                <View style={ style.container }>
                    <Header>
                        <Left>
                            <Text style={ style.eventName }>{ event.name }</Text>
                        </Left>
                        <Right>
                            <Button small danger onPress={ onRequestClose }>
                                <Icon name='close' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={ style.content }>
                        <Image style={ style.eventImage } source={ {uri: event.image} } />
                        <Text style={ style.eventDescription }>{ event.description }</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}
