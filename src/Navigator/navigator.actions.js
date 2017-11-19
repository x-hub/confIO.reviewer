import _ from 'lodash'

const actions = {
    Navigate: 'Navigation/NAVIGATE',
    Back:'Navigation/BACK'
}

export default actions

export const creators = {
    navigateToFeed,
    navigateToHome,
    navigateToQRScanner,
    navigateToSwiper,
    navigateToTalkDetails,
    navigateToSync,
    navigateBack
}

function navigateWithPayload(routeName, payload,type = actions.Navigate) {
    let action = {
        type,
    }
    if(payload && _.isFunction(payload.then)) {
        action.payload = payload.then(
            (p) => {
                return  {
                    routeName,
                    params: p
                    }
            }
        )
    } else {
        action.payload = {
            routeName,
            params: payload,
        }
    }
    return action
}
function navigateBack(payload) {
    return navigateWithPayload(undefined,payload,actions.Back)
}

function navigateToSync(payload) {
    return navigateWithPayload('Sync', payload)
}

function navigateToFeed(payload) {
    return navigateWithPayload('Feed', payload)
}

function navigateToHome(payload) {
    return navigateWithPayload('Home', payload)
}

function navigateToQRScanner(payload) {
    return navigateWithPayload('LoginWithQRCode', payload)
}
function navigateToSwiper(payload) {
    return navigateWithPayload('Swiper', payload)
}

function navigateToTalkDetails(payload) {
    return navigateWithPayload('Detail', payload)
}
