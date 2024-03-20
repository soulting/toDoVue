const postTask = async (newTask, listNumber) => {
  const body = {
    newTask: {
      task_id: 1,
      description: newTask,
      favorite: false,
    },
    listNumber: listNumber,
  };

  try {
    const response = await fetch("http://localhost:5000/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to poste the Task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export default postTask;
