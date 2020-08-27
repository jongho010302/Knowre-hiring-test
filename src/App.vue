<template>
  <div id="app">
    <!-- Root Container -->
    <div class="Container">
      <!-- Content -->
      <div class="Content">
        <div v-if="problems.length">
          <div v-for="(problem, index) in problems" :key="index">
            <problem-item :problem="problem" style="margin-bottom: 15px"></problem-item>
          </div>
        </div>
      </div>
      <aside class="Result">
        <div v-if="results.length">
          <p v-for="(result, index) in results" :key="index">{{ result }}</p>
        </div>
      </aside>
      <!-- Footer -->
      <div class="Footer">
        <button class="SubmitButton" :disabled="isSubmitted" @click="submit">제출</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProblemItem from './components/ProblemItem.vue'
import axios from 'axios';

const { VUE_APP_MY_BACK_URL } = process.env;

export default {
  name: 'App',
  components: {
    ProblemItem
  },
  data() {
    return {
      problems: [],
      results: [],
    };
  },
  computed: {
    isSubmitted() {
      return this.$store.state.isSubmitted;
    }
  },
  async created() {
    this.problems = await this.fetchProblem();
    for(const problem of this.problems) {
      this.$store.dispatch('addAnswer', { id: problem.id });
    }
  },
  methods: {
    async fetchProblem() {
      try {
        const { data } = await axios.get(`${VUE_APP_MY_BACK_URL}/api/fetchProblem`);
        return data.problems;
      } catch(err) {
        console.error(err);
      }
    },
    async submit() {
      const { data } = await axios.post(`${VUE_APP_MY_BACK_URL}/api/submit`, {
        input: this.$store.state.answers
      });
      for(const result of data.results) {
        const OX = result.result ? 'O' : 'X';
        this.results.push(`${result.id}. ${OX}`);
      }
      this.$store.commit('setSubmitted', true);
    }
  }

}
</script>

<style>
.Container {
  position: relative;
  width: 1024px;
  margin: 0 auto;
  border: 1px solid black;
  border-width: 0 1px 1px;
  height: 900px;
}
.Content {
  position: absolute;
  left: 0;
  right: 150px;
  top: 0;
  bottom: 50px;
  height: 94%;
  overflow-y: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.Result {
  position: absolute;
  top: 0;
  width: 150px;
  right: 0;
  height: 94%;
  border-left: 1px solid black;
}
.Footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid black;
  text-align: right;
}
.SubmitButton {
  width: 140px;
  height: 35px;
  margin-top: 7px;
  margin-right: 7px;
}
</style>
