import React from 'react';
import {
    Text,
    ListView,
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
import style from './loginWithSavedSession.style';

export default (props) => {
	const { navigate, goBack } = props.navigation;
    const listDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //const events = props.events;
    const events = [
        { name: 'Devoxx 2017' },
        { name: 'DockerCon 2017' },
        { name: 'ScalaCon 2017' },
    ];
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
        </Container>
    );

    function renderEventsListItem({ name, apiUrl }) {
        return (
            <ListItem>
                <Text>{ name }</Text>
            </ListItem>
        );
    }

    function renderInfoEventsListItemButton({ name }) {
		return (
			<Button full onPress={ showEventsListItemInfo }>
				<Icon active name="information-circle" />
			</Button>
		);
	}

	function renderDeleteEventsListItemButton({ name }) {
		return (
			<Button full danger onPress={ deleteEventsListItem }>
				<Icon active name="trash" />
			</Button>
		);
	}

	function deleteEventsListItem(event) {
	}

	function showEventsListItemInfo(event) {
	}
}
