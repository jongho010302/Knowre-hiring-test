<template>
  <div>
    <!-- 문제 -->
    <div>{{ problem.id }}. {{ problem.problem_text }}</div>
    <!-- 정답 선택 -->
    <div class="choice">
      <!-- 객관식 제출 전-->
      <div v-if="problem.type === 1">
        <span v-if="isSubmitted">나의 답: </span>
        <label v-for="(value, index) in JSON.parse(problem.choices)" :key="index">
          <input type="radio" :name="`choice_${problem.id}`" :value="index + 1" v-on:change="handleChangeRadio"> {{ value }}
        </label>
      </div>
      <!-- 객관식 제출 후-->
      <div v-if="problem.type === 1 && isSubmitted">
        <span v-if="isSubmitted">정답: </span>
        <label v-for="(value, index) in JSON.parse(problem.choices)" :key="index">
          <input type="radio" :name="`choice_answer_${problem.id}`" :value="index + 1" :checked="(index+1) == problem.answer"> {{ value }}
        </label>
      </div>
      <!-- 주관식 제출 전 -->
      <div v-if="problem.type === 2">
        <span v-if="isSubmitted">나의 답: </span>
        <input type="text" :name="`choice_${problem.id}`" v-on:change="handleChangeInput" style="margin-right: 10px">
      </div>
      <!-- 주관식 제출 후 -->
      <div v-if="problem.type === 2 && isSubmitted">
        <span v-if="isSubmitted">정답: </span>
        <input type="text" :name="`choice_answer_${problem.id}`" :value="problem.answer" style="margin-right: 10px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    problem: Object
  },
  data() {
    return {
      answers: []
    }
  },
  computed: {
    isSubmitted() {
      return this.$store.state.isSubmitted;
    },
  },
  methods: {
    handleChangeRadio(e) {
      const obj = {
        id: e.target.name.replace('choice_', ''),
        answer: e.target.value
      };
      this.$store.dispatch('addAnswer', obj);
    },
    handleChangeInput(e) {
      const obj = {
        id: e.target.name.replace('choice_', ''),
        answer: e.target.value
      };
      this.$store.dispatch('addAnswer', obj);
    }
  }
}
</script>

<style>
.choice{
  text-align: right;
}
</style>