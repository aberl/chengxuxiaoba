import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import getters from './getters.js'
import actions from './actions.js'
import user from './modules/user.js'
import course from './modules/course.js'
import file from './modules/file.js'
import video from './modules/video.js'
import evaluation from './modules/evaluation.js'

export default new Vuex.Store({
	getters,
	actions,
	modules:{
		user,course,file,video,evaluation
	}
});