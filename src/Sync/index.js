import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import template from './sync.template';
import { removeActivity, saveActivities } from 'app/App/Services/EventService'
import _ from 'lodash'

export const actions = {
    REMOVE_ACTION: 'REMOVE_ACTION',
    SYNC_ACTIONS: 'SYNC_ACTIONS',
    REMOVE_RESPONSE_ANIMATION:'REMOVE_RESPONSE_ANIMATION',
    RESET: 'RESET',
};

const actionCreators = {
    removeAction,
    syncActions,
    removeResponseAnimation,
    resetSync,
};

function resetSync() {
    return {
        type: actions.RESET,
        payload: {
            actionsDirty: false,
        },
    }
}

function removeAction(event, action) {
    const payload = removeActivity(event.code, action)
    return {
        type: actions.REMOVE_ACTION,
        payload: payload,
    }
}

function removeResponseAnimation() {
    const payload = new Promise(
        (resolve, reject) => {
            setTimeout(
                () => {
                    resolve({
                        syncSuccess: false,
                    })
                }
                , 3500
            )
        }
    )
    return {
        type: actions.REMOVE_RESPONSE_ANIMATION,
        payload: payload,
    }
}

function syncActions({ code, baseUrl }, actionsToSync, callback) {
    const payload = Promise.all(
        _.map(
            actionsToSync
            , function({ target, score, timestamp }) {
                return fetch(baseUrl.concat(`cfpadmin/proposal/${target}/vote?vote=${score}&_=${timestamp}`))
                .then((response) => _.merge(response, { timestamp }))
            }
        )
    )
    .then(
        (responses) => {
            const syncedActions = _.map(responses, ({ timestamp }) => timestamp)
            return _.filter(
                actionsToSync,
                (action) => {
                    return !_.includes(syncedActions, action.timestamp)
                }
            )
        }
    )
    .then(
        (notSyncedActions) => {
            return saveActivities(code, notSyncedActions)
                .then(
                    () => {
                        return {
                            actions: notSyncedActions,
                            syncSuccess: true,
                        }
                    }
                )
        }
    )
    .catch(
        (err) => {
            return {
                actions: actionsToSync,
                syncError: true,
            }
        }
    )
    payload.then(callback)
    return {
        type: actions.SYNC_ACTIONS,
        payload: payload,
    };
}

function mapStateToProps(state) {
    return state.sync;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
