import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Left,
    Right,
    Button,
    Icon
} from 'native-base';
import { AutoPlayAnimation } from 'shared';
import style from './sync.style';
import animations from 'shared/animations';

export default class Sync extends Component {
    constructor(props){
        super();
        this.state = {
            refreshing :false,
            opacity :new Animated.Value(0),
            color :new Animated.Value('#FFF')
        }

    }
    componentWillUnmount() {
        this.props.resetSync()
    }

    render() {
        return renderSync(this.props)
    }
}

function renderSync(props) {
    const { event } = props.navigation.state.params;
    const { actionsDirty, syncSuccess, isRefreshing, syncActions, removeAction, removeResponseAnimation } = props;
    const actionsFromProps = props.actions;
    const actionsFromParams = props.navigation.state.params.actions;
    const actions = actionsDirty? actionsFromProps : actionsFromParams;
    const { goBack, navigate } = props.navigation;
    const SyncBody = syncSuccess ? SyncSuccess : !!(actions || []).length ? ActionsList : EmptyActionsList;
    return (
        <Container>
            <Header style={ style.header }>
				<Left>
                    <Button onPress={ () => goBack() } transparent>
						<Icon style={ style.goBackIcon } name='arrow-back' />
					</Button>
				</Left>
                <Text style={ style.sceneTitle }>Synchronize</Text>
                <SyncButton />
            </Header>
            <Content>
               <SyncBody />
            </Content>
        </Container>
    );

    function SyncButton() {
        return ((actions || []).length == 0 ? <Text></Text>  :   <Right>
            <Button onPress={()=> !isRefreshing && syncActions(event, actions, removeResponseAnimation) } transparent>
                <Icon style={ style.goBackIcon } name='md-sync' />
            </Button>
        </Right>)
    }

    function ActionsList() {
       return(
               <RenderContent />
           );
        /*

        return (
            <PullToRefresh
            isRefreshing={ isRefreshing }
            onRefresh={ syncActions.bind(this, event, actions, removeResponseAnimation) }
            animationBackgroundColor={ style.animationBackgroundColor }
            pullHeight={ 180 }
            contentView={ renderContent() }
            onPullAnimationSrc={ animations.coffee_pull }
            onStartRefreshAnimationSrc={ animations.coffee_start }
            onRefreshAnimationSrc={ animations.coffee_repeat }
            onEndRefreshAnimationSrc={ animations.coffee_end }
            />
        )
        */
    }

    function EmptyActionsList() {
        return (
            <View>
                <AutoPlayAnimation
                style={ style.emptyActionAnimation }
                source={ animations.empty_box }
                />
                <Text style={ style.emptyActionsListText }>You're Lazy, No actions to Sync</Text>
            </View>
        )
    }

    function SyncSuccess() {
        return (
            <View>
                <AutoPlayAnimation
                style={ style.doneAnimation }
                source={ animations.done }
                />
                <Text style={ style.syncSuccessText }>Sync Success!</Text>
            </View>
        )
    }

    function RenderContent() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={ actions }
                    renderItem={ renderAction }
                    refreshing={isRefreshing}
                    keyExtractor={ ({ timestamp }) => timestamp }
                />
            </View>
        );
    }

    function renderAction({ item }) {
        const { target, score, timestamp } = item
        return (
            <View key={ target } style={ style.actionContainer }>
                <Left style={ style.actionTextContainer }>
                    { humanReadable() }
                </Left>
                <Right style={ style.actionRemoveContainer }>
                    <Button danger
                    onPress={ removeAction.bind(this, event, item) }
                    >
                        <Icon name='trash'/>
                    </Button>
                </Right>
            </View>
        );

        function humanReadable() {
            return (
                <Text style={ style.actionText }>
                    Voted for <Text style={ style.actionVoteTarget  }>{ target }</Text>
                    <Text> with </Text>
                    <Text style={ style.actionVoteResult }>{ score }</Text>
                </Text>
            );
        }
    }

}
