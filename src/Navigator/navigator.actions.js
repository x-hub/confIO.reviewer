import _ from 'lodash'

const actions = {
    Navigate: 'Navigation/NAVIGATE',
}

export default actions

export const creators = {
    navigateToFeed,
    navigateToHome,
    navigateToQRScanner,
    navigateToSwiper,
    navigateToTalkDetails,
}

function navigateWithPayload(routeName, payload) {
    let action = {
        type: actions.Navigate,
    }
    if(payload && _.isFunction(payload.then)) {
        action.payload = payload.then(
            (p) => {
                console.log("swiper payload", p)
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
