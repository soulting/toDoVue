const deleteList = async (id) => {
  const listToBeDeleted = {
    id: id,
  };
  try {
    const response = await fetch("http://localhost:5000/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listToBeDeleted),
    });
    if (!response.ok) {
      throw new Error("List can't be deleted");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default deleteList;
