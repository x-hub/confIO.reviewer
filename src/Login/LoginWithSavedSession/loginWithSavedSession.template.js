import React from 'react';
import {
    Text,
    ListView,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Content,
    List,
    ListItem,
} from 'native-base';
import EventDetailsDialog from 'app/EventDetailsDialog';
import style from './loginWithSavedSession.style';

export default (props) => {
	const { navigate, goBack } = props.navigation;
    const listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //const events = props.events;
    const events = [
        { name: 'Devoxx 2017', image: 'https://devoxx.ma/assets/images/logos/logo.png', description: 'dq sidjqld kqdj qjdklq jqsdkl qldk jqsdklj qklsjd qkjd qkjdq kjdqkjd qskjj qskd qkdjqkdqsdkqsdqdq qsd qsdqsd' },
        { name: 'DockerCon 2017' },
        { name: 'ScalaCon 2017' },
    ];
    const { dialogVisible, selectedEvent } = props;
    return (
        <Container>
            <Header style={ style.header }>
				<Left>
                    <Button onPress={ () => goBack() } transparent>
						<Icon style={ style.goBackIcon } name='arrow-back' />
					</Button>
				</Left>
                <Text style={ style.sceneTitle }>Select Session to Login</Text>
            </Header>
            <Content>
                <List
                dataSource={ listDataSource.cloneWithRows(events) }
                renderRow={ renderEventsListItem }
                renderLeftHiddenRow={ renderInfoEventsListItemButton }
                renderRightHiddenRow={ renderDeleteEventsListItemButton }
				leftOpenValue={ 75 }
				rightOpenValue={ -75 }
                >
                </List>
            </Content>
            <EventDetailsDialog
            visible={ dialogVisible }
            event={ selectedEvent }
            onRequestClose={ props.hideEventDetails.bind(this) }
            />
        </Container>
    );

    function renderEventsListItem({ name, apiUrl }) {
        return (
            <ListItem>
                <TouchableOpacity
                onPress={ ()=>{props.selectEvent(); navigate('Home')} }
                style={ style.eventListItemBtn }>
                    <Text style={ style.eventListItemName } >{ name }</Text>
                </TouchableOpacity>
            </ListItem>
        );
    }

    function renderInfoEventsListItemButton(event) {
		return (
			<Button full onPress={ props.showEventDetails.bind(this, event) }>
				<Icon active name="information-circle" />
			</Button>
		);
	}

	function renderDeleteEventsListItemButton(event) {
		return (
			<Button full danger onPress={ props.deleteEvent.bind(this, event) }>
				<Icon active name="trash" />
			</Button>
		);
	}
}
