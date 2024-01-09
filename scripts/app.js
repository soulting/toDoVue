const app = Vue.createApp({
  data() {
    return {
      books: [
        {
          autor: "Andrzej",
          title: "JAk pracować ",
          img: "./imgs/a.png",
          isFav: true,
        },
        {
          autor: "Pączek",
          title: "Jak zarabiać",
          img: "./imgs/p.png",
          isFav: false,
        },
        {
          autor: "Bartek",
          title: "Jak sie opierdalać",
          img: "./imgs/b.png",
          isFav: false,
        },
      ],
    };
  },
  methods: {
    click(book) {
      book.isFav = !book.isFav;
    },
  },
});

app.mount(".app");
