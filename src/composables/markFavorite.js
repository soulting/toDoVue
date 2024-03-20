const markFavorite = async (listId, taskId) => {
  const task = { listId: listId, taskId: taskId };
  try {
    const response = await fetch("http://localhost:5000/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("marking as favorite failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default markFavorite;
