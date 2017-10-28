import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Footer,
    FooterTab,
    Button,
    Icon,
	Left,
} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import style from './loginWithQRCode.style';

export default (props) => {
	const navigate = props.navigation.navigate;
    return (
        <Container>
            <Header style={ style.header }>
				<Left>
					<Button onPress={ navigate.bind(null, 'Login') } transparent>
						<Icon name='arrow-back' />
					</Button>
				</Left>
            </Header>
            <Content>
                <View style={ style.scanTipsContainer }>
                    <View style={ style.scanTipsIconContainer } >
                        <Icon style={ style.scanTipsIcon } name="information" />
                    </View>
                    <Text style={ style.scanTips }>
                       Go to your confIO instance on your computer and scan the QR code.
                    </Text>
                </View>
                <View>
                    <QRCodeScanner onRead={ props.onQRCodeRead.bind(this) }/>
                </View>
            </Content>
            <Footer>
                <FooterTab>
                    <Button onPress={ navigate.bind(null, 'LoginWithSavedSession') } style={ style.savedSessionsBtn } full>
                        <Text style={ style.savedSessions } >Login with Saved Session</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
