import { reactive } from "vue";

const getList = () => {
  const state = reactive({
    lists: [],
    error: null,
    loading: true,
  });

  const loadList = async () => {
    try {
      let response = await fetch("http://localhost:5000/lists");
      if (!response.ok) {
        throw new Error("loading the list failed");
      }
      const data = await response.json();
      state.lists = data.lists;
    } catch (error) {
      state.error = error.message;
    } finally {
      state.loading = false;
    }
  };
  loadList();

  return state;
};

export default getList;
