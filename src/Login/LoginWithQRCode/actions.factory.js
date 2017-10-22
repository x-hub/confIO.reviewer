import {ACTIONS} from "app/App/actionsType"

export const actionCreators = {
    onQRCodeRead
};
function onQRCodeRead(e) {
    return {
        type: ACTIONS.QR_CODE_READ,
        payload: e
    }
}
