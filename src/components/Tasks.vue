<template>
  <section class="task-window">
    <div class="task-list">
      <div class="task-nav">
        <div class="task-list-title-container">
          <p v-if="!state.loading">{{ selectedListElement.title }}</p>
          <p v-else>loading</p>
          <div class="options-button" @click="showOverlayContainer">
            <img src="@/assets/images/dots.png" alt="dots image" />
            <div v-if="showOptions" class="options-container" @click.stop>
              <h4>Opcje:</h4>
              <p @click="showNewTitleContainer">Zmień nazwę listy</p>
              <p @click="deletee">Usuń listę</p>
            </div>
          </div>
        </div>
        <div class="add-task-container" @click="toggleNewTaskContainer">
          <img src="@/assets/images/add.png" alt="add task icon" />
          <p>dodaj zadanie</p>
        </div>
      </div>
      <div v-if="showNewTaskContainer" class="new-task">
        <img src="@/assets/images/tick.png" alt="completion checkbox" />
        <input v-model="newTask" type="text" @keydown.enter="addNewTask" />
        <div class="overlay-controls">
          <img
            @click="addNewTask"
            src="@/assets/images/tick-selected.png"
            alt="accept icon"
          />
          <img
            @click="toggleNewTaskContainer"
            src="@/assets/images/cancle.png"
            alt="cancle icon"
          />
        </div>
      </div>
      <div
        class="new-task-overlay"
        v-if="showNewTaskContainer || showOptions"
        @click="closeOverlay"
      ></div>
      <div class="all-tasks" v-if="!state.loading">
        <TaskVue
          v-for="(task, i) in selectedListElement.tasks"
          :key="i"
          :task="task"
          :selectedList="selectedList"
          :selectedTag="selectedTag"
          @reload="reload"
        />
      </div>
    </div>
    <div class="new-title-overlay" v-if="showNewTitle" @click="closeOverlay">
      <div class="new-title-container" @click.stop>
        <p>Zmiana nazwy listy</p>
        <input
          class="new-list-title"
          v-model="newTitle"
          type="text"
          :placeholder="selectedListElement.title"
        />
        <div class="overlay-controls">
          <button class="anuluj-button" @click="closeOverlay">Anuluj</button>
          <button class="gotowe-button" @click="changeListTitle">Gotowe</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import postTask from "@/composables/postTask";
import changeTitle from "@/composables/changeTitle";
import deleteList from "@/composables/deleteList";
import { computed, onMounted, reactive, ref, nextTick } from "vue";
import TaskVue from "./Task.vue";

const props = defineProps({
  state: {
    type: Object,
    required: true,
  },
  selectedList: {
    type: Number,
    required: true,
  },
  selectedTag: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["reload"]);

const showNewTaskContainer = ref(false);
const showOptions = ref(false);
const showNewTitle = ref(false);
const newTask = ref(null);
const newTitle = ref("");

const deletee = async () => {
  showOptions.value = false;
  try {
    const response = await deleteList(props.selectedList);
    if (response.message === "completed") {
      emit("reload");
    }
  } catch (error) {
    throw error;
  }

  deleteList(props.selectedList);
};

const changeListTitle = async () => {
  if (newTitle === "") {
    return;
  }
  try {
    const response = await changeTitle(newTitle.value, props.selectedList);
    if (response.message === "completed") {
      showNewTitle.value = false;
      emit("reload");
    }
  } catch (error) {
    throw error;
  }
};

const showNewTitleContainer = () => {
  showOptions.value = false;
  showNewTitle.value = true;
};

const closeOverlay = () => {
  showOptions.value = false;
  newTask.value = "";
  showNewTaskContainer.value = false;
  showNewTitle.value = false;
};

const showOverlayContainer = () => {
  showOptions.value = true;
};

const reload = () => {
  emit("reload");
};

const toggleNewTaskContainer = () => {
  newTask.value = "";
  showNewTaskContainer.value = !showNewTaskContainer.value;

  if (showNewTaskContainer.value) {
    nextTick(() => {
      const input = document.querySelector(".new-task input");
      if (input) {
        input.focus();
      }
    });
  }
};

const selectedListElement = computed(() => {
  console.log();
  const temporaryList = props.state.lists.find(
    (list) => list.id === props.selectedList
  );
  if (props.selectedTag === 1) {
    return temporaryList;
  } else {
    console.log(temporaryList.tasks.filter((item) => item.favorite === true));
    console.log(temporaryList);
    return temporaryList;
  }
});

const addNewTask = async () => {
  if (!newTask.value) {
    return;
  }
  showNewTaskContainer.value = !showNewTaskContainer.value;
  try {
    const response = await postTask(newTask.value, props.selectedList);
    if (response.message === "completed") {
      newTask.value = "";
      emit("reload");
    }
  } catch (error) {
    console.error("Wystąpił błąd podczas dodawania zadania:", error);
  }
};
</script>

<style>
.task-window {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-list {
  background-color: white;
  height: 95%;
  width: 50%;
  border-radius: 25px;
  border: 1px solid rgb(226, 228, 230);
  transition: all 0.5s;
}

.task-list:hover {
  box-shadow: 0px 0px 12px -6px rgba(66, 68, 90, 1);
}

.task-list-title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
  padding-left: 30px;
  font-size: 20px;
  user-select: none;
  height: 50px;
}

.task-list-title-container button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  transition: all 0.3s;
  cursor: pointer;
}

.task-list-title-container button:hover {
  background-color: rgb(226, 228, 230);
}

.task-list-title-container img {
  height: 20px;
}

.add-task-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: rgb(15, 189, 127);
  cursor: pointer;
  user-select: none;
  width: 50%;
  border-radius: 25px;
  height: 35px;
  margin-left: 15px;
  padding-left: 15px;
  transition: all 0.3s;
}

.add-task-container:hover {
  background-color: rgb(226, 228, 230);
}

.add-task-container img {
  height: 20px;
}

.all-tasks {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
}

.task-nav {
  border-bottom: 0.5px solid rgb(198, 198, 198);
  margin-bottom: 5px;
}

.new-task {
  position: relative;
  z-index: 100;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 20px;
}

.new-task img {
  height: 20px;
}

.new-task input {
  font-size: 16px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border: none;
  border-bottom: 0.5px solid rgb(199, 199, 199);
}

.new-task input:focus {
  outline: none;
  border-bottom: 2px solid rgb(15, 189, 127);
}

.overlay-controls {
  margin: 0px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 30px;
}

.new-task-overlay {
  top: 0;
  left: 0;
  z-index: 99;
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.options-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
}

.options-button:hover {
  background-color: rgb(226, 228, 230);
  border-radius: 50%;
}

.options-container {
  z-index: 100;
  position: absolute;
  top: 30px;
  right: 0px;
  background-color: white;
  border: 0.5px solid rgb(199, 199, 199);
  border-radius: 15px;
  padding: 15px;
  width: 250px;
  height: auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: left;
  box-shadow: 0px 0px 12px -6px rgba(66, 68, 90, 1);
}

.options-container p,
h4 {
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  height: 30px;
  border-radius: 25px;
}

.options-container p:hover {
  background-color: rgb(226, 228, 230);
}

.new-title-container {
  position: absolute;
  height: 25vh;
  width: 20vw;
  font-size: 20px;
  background-color: rgb(255, 255, 255, 1);
  border: solid black 1px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.new-title-overlay {
  top: 0px;
  left: 0px;
  z-index: 110;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
