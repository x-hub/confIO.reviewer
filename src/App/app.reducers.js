import loginReducer from 'app/Login/login.reducer';
import loginWithSavedSessionReducer from 'app/Login/LoginWithSavedSession/loginWithSavedSession.reducer';
import loginWithQRCodeReducer from 'app/Login/LoginWithQRCode/loginWithQRCode.reducer';
import talkswiperReducer from 'app/TalkSwiper/talkswiper.reducer'
import talkDetailReducer from 'app/TalkDetail/talkdetail.reducer'
import syncReducer from 'app/Sync/sync.reducer';
import navigatorReducer from 'app/Navigator/navigator.reducer';
import feedReducer from 'app/Feed/feed.reducer';

export const login = loginReducer;
export const loginWithSavedSession = loginWithSavedSessionReducer;
export const loginWithQRCode = loginWithQRCodeReducer;
export const talkswiper = talkswiperReducer;
export const talkdetail = talkDetailReducer;
export const sync = syncReducer;
export const nav = navigatorReducer;
export const feed = feedReducer;
