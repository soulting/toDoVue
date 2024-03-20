<template>
  <div class="navbar-container">
    <nav>
      <div class="title-container">
        <img src="@/assets/images/checklist.png" alt="website image" />
        <h3>First Vue Project</h3>
      </div>
      <div class="tasks-tag-container">
        <div
          class="tasks-tag"
          @click="toggleActiveTag(1)"
          :class="{ active: activeTag === 1 }"
        >
          <img
            :src="
              activeTag === 1
                ? require('@/assets/images/list-selected.png')
                : require('@/assets/images/list.png')
            "
            alt="all tasks icon"
          />
          <p>Wszystkie zadania</p>
        </div>
        <div
          class="tasks-tag"
          @click="toggleActiveTag(2)"
          :class="{ active: activeTag === 2 }"
        >
          <img
            :src="
              activeTag === 2
                ? require('@/assets/images/favorite-selected.png')
                : require('@/assets/images/favorite.png')
            "
            alt="favorite tasks icon"
          />
          <p>Oznaczone gwiazdką</p>
        </div>
      </div>
      <transition name="lists">
        <div v-if="!state.loading" class="list-container">
          <h4>listy:</h4>
          <div
            class="list"
            v-for="(element, i) in filteredList"
            :key="i"
            @click="toggleActiveList(element.id)"
            :class="{ active: activeList === element.id }"
          >
            <img
              :src="
                activeList === element.id
                  ? require('@/assets/images/checkmark.png')
                  : require('@/assets/images/unchecked.png')
              "
              alt="checkbox icon"
            />
            {{ element.title }}
          </div>
          <div class="add-list" @click="toggleOverlay">
            <img src="@/assets/images/plus.png" alt="" />
            Utwórz nową listę
          </div>
        </div>
        <div v-else class="list-container"><h3>Loading</h3></div>
      </transition>
    </nav>
    <div v-if="overlay" class="overlay" @click="toggleOverlay">
      <div class="overlay-inner-container" @click.stop>
        <p>Tworzenie nowej listy</p>
        <input
          v-model="newList"
          class="new-list-title"
          type="text"
          placeholder="Wpisz nazwę"
          @keydown.enter="addNewList"
        />
        <div class="overlay-controls">
          <button class="anuluj-button" @click="toggleOverlay">Anuluj</button>
          <button class="gotowe-button" @click="addNewList">Gotowe</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import postList from "../composables/postList.js";

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

const emit = defineEmits([
  "updateActiveTag",
  "updateActiveList",
  "update-lists",
]);

const activeTag = ref(props.selectedTag);
const activeList = ref(props.selectedList);
const overlay = ref(false);
const newList = ref("");

const filteredList = computed(() => {
  return props.state.lists.filter((item) => item.active);
});

const addNewList = () => {
  postList(newList.value, props.state.lists.length + 1).then(() => {
    emit("update-lists");
    newList.value = "";
    overlay.value = false;
  });
};

const toggleOverlay = () => {
  overlay.value = !overlay.value;
};

const toggleActiveTag = (tagNumber) => {
  activeTag.value = tagNumber;
  emit("updateActiveTag", tagNumber);
};

const toggleActiveList = (listNumber) => {
  activeList.value = listNumber;
  emit("updateActiveList", listNumber);
};
</script>

<style>
.navbar-container {
  height: 100%;
  display: flex;
}
nav {
  z-index: 99;
  background-color: white;
  width: 20vw;
  border: solid rgb(201, 201, 201) 0.5px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 5px;
  transition: all 0.3s;
}

nav:hover {
  box-shadow: 0px 0px 12px -6px rgba(66, 68, 90, 1);
}

.title-container {
  margin-bottom: 50px;
  user-select: none;
}

.tasks-tag-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.tasks-tag {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
  border-radius: 20px;
}

.tasks-tag:hover {
  background-color: rgb(237, 237, 237);
}

.tasks-tag img {
  height: 25px;
}

.list,
.add-list {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 10px;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  border-radius: 20px;
}

.list:hover {
  background-color: rgb(237, 237, 237);
}

.list img,
.add-list img {
  height: 25px;
}

.active {
  background-color: rgb(226, 226, 226);
  font-weight: bold;
}

.add-list {
  background-color: rgb(15, 189, 127);
  border-radius: 25px;
  color: white;
}

.add-list:hover {
  box-shadow: 0px 0px 14px -6px rgba(66, 68, 90, 1);
}

.overlay {
  z-index: 100;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-inner-container {
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

.new-list-title {
  font-size: 18px;
  height: 40px;
  width: 85%;
  background-color: rgb(248, 249, 250);
  border: none;
  outline: none;
  margin-bottom: 40px;
}

.new-list-title:focus {
  border-bottom: 2px solid rgb(15, 189, 127);
}

.overlay-controls {
  width: 80%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.overlay-controls button {
  border: none;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
}

.gotowe-button {
  color: rgb(15, 189, 127);
}

.lists-enter-from {
  opacity: 0;
}
.lists-enter-to {
  opacity: 1;
}
.lists-enter-active {
  transition: all 1s ease;
}

.lists-leave-from {
  opacity: 1;
}
.lists-leave-to {
  opacity: 0;
}
.lists-leave-active {
  transition: all 0s ease;
}
</style>
