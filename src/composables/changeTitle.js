const changeTitle = async (newTitle, id) => {
  const titlePack = { newTitle: newTitle, id: id };
  try {
    const response = await fetch("http://localhost:5000/title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(titlePack),
    });
    if (!response.ok) {
      throw new Error("changing the title failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default changeTitle;
