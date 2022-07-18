<template>
  <div class="admin-create-post">
    <div class="admin-create-post__wrapper">
      <div class="admin-create-post__left">
        <input type="text" placeholder="Name..." />
        <textarea cols="30" rows="10" placeholder="Description..."></textarea>
        <div class="admin-create-post__preparation">
          <label for="step">Preparation Steps:</label>
          <div>
            <textarea
              v-model="step"
              id="step"
              type="text"
              placeholder="Step..."
            />
            <button class="admin-create-post__button" @click="inputStep">
              Add Step
            </button>
          </div>
          <div class="admin-create-post__empty" v-if="steps.length == 0">
            There are no steps <br />
            Add some
          </div>
          <ul v-else>
            <li v-for="(item, index) in steps" :key="index">
              <strong>{{ index + 1 }}.</strong> {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="admin-create-post__right">
        <input class="input-image" type="file" />
        <div class="admin-create-post__ingredients">
          <input type="text" placeholder="Enter a ingredient..." />
        </div>
      </div>
    </div>
    <button class="admin-create-post__submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: "AdminCreatePost",
  data() {
    return {
      steps: [],
      step: "",
    };
  },
  methods: {
    inputStep() {
      if (this.step.length > 0) {
        this.steps.push(this.step);
        this.step = "";
      }
    },
  },
};
</script>