const getNewList = async (currentState) => {
  currentState.loading = true;

  try {
    const response = await fetch("http://localhost:5000/lists");
    if (!response.ok) {
      throw new Error("Loading failed");
    }
    const data = await response.json();
    currentState.lists = data.lists;
  } catch (error) {
    currentState.error = error.message;
  } finally {
    currentState.loading = false;
  }
};

export default getNewList;
