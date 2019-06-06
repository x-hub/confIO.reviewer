import React, { Component } from 'react';
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

export default class LoginWithSavedSession extends Component {
    componentWillMount() {
        this.props.fetchEvents();
    }
    render() {
        return render(this.props);
    }
}

function render(props) {
	const { navigate, goBack } = props.navigation;
    const listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { dialogVisible, selectedEvent, events } = props;
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
                />
            </Content>
            <EventDetailsDialog
            visible={ dialogVisible }
            event={ selectedEvent }
            onRequestClose={ props.hideEventDetails.bind(this) }
            />
        </Container>
    );

    function renderEventsListItem(event) {
        return (
            <ListItem>
                <TouchableOpacity
                onPress={ ()=>{
                    //props.selectEvent(event);
                    props.goHome(event)
                     } }
                style={ style.eventListItemBtn }>
                    <Text style={ style.eventListItemName } >{ event.name }</Text>
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
