import React, { Component } from 'react';
import template from './loginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AsyncStorage } from 'react-native';
import navActions from 'app/Navigator/navigator.actions';

export const actions = {
    QR_CODE_READ: 'QR_CODE_READ',
};

const actionCreators = {
    onQRCodeRead
};

function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

function handleQRCode(data) {
    const { authToken, authEndpoint, eventDetailsEndpoint } = JSON.parse(unescapeHtml(data));
    return Promise.all([
        fetch(eventDetailsEndpoint).then((response) => response.json()),
        AsyncStorage.getItem('events'),
        fetch(authEndpoint, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ token: authToken }),
			credentials: 'include' 
		}).then((response) => response.text()),
    ])
	.then(([ event, eventsString ]) => {
		const events = eventsString? JSON.parse(eventsString) : [];
		let saveEventsPromise = Promise.resolve(events);
		if(!events.includes(event.code)) {
			events.push(event.code);
			saveEventsPromise = AsyncStorage.setItem('events', JSON.stringify(events));
		}
		return saveEventsPromise.then(() => {
			return AsyncStorage.setItem(`events:${event.code}`, JSON.stringify(event));
        }).then(() => event);
    }).catch(console.log);
}


function onQRCodeRead({ data }) {
    return {
        type: navActions.GOTO_Feed,
        payload: handleQRCode(data)
    }
}

function mapStateToProps(state) {
    return state.loginWithQRCode;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
