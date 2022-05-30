import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import $ from 'jquery';
import { io } from "socket.io-client";
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import MessageHandlerMixin from './mixins/MessageHandlerMixin';
import router from './router';
import store from './store';


Vue.mixin(MessageHandlerMixin);
global.$ = $;

/* FontAwesome */
fontawesome.library.add(solid);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const socket = io('http://localhost:5005', { transports: ['websocket'] });

Vue.use(
	new VueSocketIO({
		debug: true,
		connection: socket,
		vuex: {
			store,
			actionPrefix: 'SOCKET_',
			mutationPrefix: 'SOCKET_'
		}
		// transports: ['websocket', 'polling', 'flashsocket']
	})
);

/* App Mount */
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
