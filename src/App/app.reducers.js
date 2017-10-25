import loginReducer from 'app/Login/login.reducer';
import loginWithSavedSessionReducer from 'app/Login/LoginWithSavedSession/loginWithSavedSession.reducer';
import talkswiperReducer from 'app/TalkSwiper/talkswiper.reducer'
import talkDetailReducer from 'app/TalkDetail/talkdetail.reducer'

export const login = loginReducer;
export const loginWithSavedSession = loginWithSavedSessionReducer;
export const talkswiper = talkswiperReducer;
export const talkdetail = talkDetailReducer;

