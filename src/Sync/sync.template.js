import React from 'react';
import {
    Text,
    View,
    ScrollView,
    ScrollItem,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
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

export default (props) => {
    //const { isRefreshing, onRefresh } = props;
    const state = {
        isRefreshing: false,
        onRefresh: () => { state.isRefreshing != state.isRefreshing }
    };
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
                isRefreshing={ state.isRefreshing }
                onRefresh={ state.onRefresh }
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
            <ScrollView>
            </ScrollView>
        );
    }
}
