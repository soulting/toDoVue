const postList = async (newTitle, newId) => {
  const list = { id: newId, active: true, title: newTitle, tasks: [] };

  try {
    let response = await fetch("http://localhost:5000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    if (!response.ok) {
      throw new Error("loading the list failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default postList;
