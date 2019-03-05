import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { stringify } from 'qs';
import auth0 from 'auth0-js';
import { message } from 'antd';
import axios from 'axios';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

const auth = new auth0.WebAuth({
	domain: 'x-liquid.auth0.com',
	clientID: 'c6DTboSjwkBh5ZD970CJoqr24orlZJbU',
	redirectUri: 'http://localhost:8000/user/callback',
	responseType: 'token id_token',
	scope: 'openid profile',
	audience: 'https://www.nest-china.com/api'
});

const authCallback = () =>
	new Promise((resolve, reject) => {
		return auth.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				resolve(authResult);
			} else {
				reject(err);
			}
		});
	});

const getData = (options) => axios.get('http://127.0.0.1:3000/api/v1/user', options);

export default {
	namespace: 'login',

	state: {
		status: undefined,
		redirect: null,
		redirectOrigin: null
	},

	effects: {
		*login({ payload }, { call, put }) {
			const urlParams = new URL(window.location.href);
			const params = getPageQuery();
			let { redirect } = params;
			let redirectOrigin = null;
			if (redirect) {
				const redirectUrlParams = new URL(redirect);
				redirectOrigin = redirectUrlParams.origin === urlParams.origin;
				if (redirectOrigin) {
					redirect = redirect.substr(urlParams.origin.length);
					if (redirect.match(/^\/.*#/)) {
						redirect = redirect.substr(redirect.indexOf('#') + 1);
					}
				}
			}

			yield put({
				type: 'set',
				payload: {
					redirect,
					redirectOrigin
				}
			});

			auth.authorize();
		},

		*authentication({ payload }, { call, put, select }) {
			const redirect = yield select(({ redirect }) => redirect);

			try {
				const authResult = yield call(authCallback);

				yield put({
					type: 'set',
					payload: authResult
				});
				router.replace(redirect || '/');
			} catch (err) {
				message.error(`Error: ${authResult.error}. Check the console for further details.`);
				routerRedux.push({
					pathname: '/user/login'
				});
			}
		},
		*getCaptcha({ payload }, { call }) {
			yield call(getFakeCaptcha, payload);
		},

		*logout(_, { put }) {
			yield put({
				type: 'changeLoginStatus',
				payload: {
					status: false,
					currentAuthority: 'guest'
				}
			});
			reloadAuthorized();
			yield put(
				routerRedux.push({
					pathname: '/user/login',
					search: stringify({
						redirect: window.location.href
					})
				})
			);
		},

		*getApiData({ payload }, { call, select }) {
			const { tokenType, accessToken } = yield select((state) => state.login);

			const result = yield call(getData, {
				headers: {
					Authorization: `${tokenType} ${accessToken}`
				}
			});
		}
	},

	reducers: {
		changeLoginStatus(state, { payload }) {
			setAuthority(payload.currentAuthority);
			return {
				...state,
				status: payload.status,
				type: payload.type
			};
		},
		set(state, { payload }) {
			return {
				...state,
				...payload
			};
		}
	}
};
