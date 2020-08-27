// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    answers: [],
    isSubmitted: false
  },
  mutations: {
    addAnswer(state, payload) {
      state.answers.push(payload);
    },
    updateAnswer(state, payload) {
      state.answers[payload.index] = payload.value
    },
    setSubmitted(state, payload) {
      state.isSubmitted = payload;
    }
  },
  actions: {
    addAnswer({ commit, state }, payload) {
      const result = state.answers.find(item => item.id == payload.id);
      if(!result) {
        return commit('addAnswer', payload);
      }

      const index = state.answers.indexOf(result);

      commit('updateAnswer', {
        index, value: payload
      });
    }
  },
});
