import React from 'react';
import {
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
    Right,
    Button,
    Icon,
} from 'native-base';
import PullToRefresh from 'react-native-pull-refresh';
import style from './sync.style';

const animations = {
    coffee_start: require('./animations/coffee_start.json'),
    coffee_pull: require('./animations/coffee_pull.json'),
    coffee_repeat: require('./animations/coffee_repeat.json'),
    coffee_end: require('./animations/coffee_end.json'),
};

const actionTypes = {
    VOTE: 'VOTE',
};

export default (props) => {
    const { actions, isRefreshing, syncActions, removeAction } = props;
    const { goBack, navigate } = props.navigation;
    return (
        <Container>
            <Header style={ style.header }>
				<Left>
                    <Button onPress={ () => goBack() } transparent>
						<Icon style={ style.goBackIcon } name='arrow-back' />
					</Button>
				</Left>
                <Text style={ style.sceneTitle }>Synchronize</Text>
            </Header>
            <Content>
                <PullToRefresh
                isRefreshing={ isRefreshing }
                onRefresh={ syncActions }
                animationBackgroundColor={ style.animationBackgroundColor }
                pullHeight={ 180 }
                contentView={ renderContent() }
                onPullAnimationSrc={ animations.coffee_pull }
                onStartRefreshAnimationSrc={ animations.coffee_start }
                onRefreshAnimationSrc={ animations.coffee_repeat }
                onEndRefreshAnimationSrc={ animations.coffee_end }
                />
            </Content>
        </Container>
    );

    function renderContent() {
        return (
            <View>
                <FlatList
                    data={ actions }
                    renderItem={ renderAction }
                    keyExtractor={ ({ id }) => id }
                />
            </View>
        );
    }

    function renderAction({ item: { type, target, payload, timestamp }}) {
        return (
            <View key={ target } style={ style.actionContainer }>
                <Left style={ style.actionTextContainer }>
                    { humanReadable() }
                </Left>
                <Right style={ style.actionRemoveContainer }>
                    <Button danger
                    onPress={ removeAction }
                    >
                        <Icon name='trash'/>
                    </Button>
                </Right>
            </View>
        );
        function humanReadable() {
            switch(type) {
                case actionTypes.VOTE:
                    return (
                        <Text style={ style.actionText }>
                            Voted for <Text style={ style.actionVoteTarget  }>{ target }</Text>
                            <Text> with </Text>
                            <Text style={ style.actionVoteResult }>{ payload }</Text>
                        </Text>
                    );
                default:
                    return <Text style={ style.actionText }>Unkown Event</Text>
            }
        }
    }

}
