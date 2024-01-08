const app = Vue.createApp({
  data() {
    return {
      title: "Marsjanin",
      autor: "Andy",
      age: 20,
    };
  },
  methods: {
    changeTitle() {
      this.age++;
      if (this.age % 2 === 0) {
      }
    },
  },
});

app.mount(".app");
