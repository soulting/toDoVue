<template>
  <transition name="navbar">
    <NavbarVue
      v-if="showNav"
      :state="state"
      :selectedList="activeList"
      :selectedTag="activeTag"
      @updateActiveTag="handleActiveTagUpdate"
      @updateActiveList="handleActiveListUpdate"
      @update-lists="reload"
  /></transition>

  <main>
    <button
      class="arrow-button"
      @click="toggleNavigation"
      @mouseover="mouseOverNav = true"
      @mouseout="mouseOverNav = false"
    >
      <img class="visibility-arrows" :src="arrowPath" alt="toggle navigation" />
    </button>
    <TasksVue
      :state="state"
      :selectedList="activeList"
      :selectedTag="activeTag"
      @reload="reload"
    />
  </main>
</template>

<script setup>
import NavbarVue from "@/components/Navbar.vue";
import TasksVue from "@/components/Tasks.vue";
import getList from "../composables/getList.js";
import getNewList from "../composables/getNewList.js";
import { reactive, computed, ref } from "vue";

const activeTag = ref(1);
const activeList = ref(1);
const showNav = ref(true);
const mouseOverNav = ref(false);
const state = getList();

const reload = () => {
  getNewList(state);
};

const handleActiveTagUpdate = (tagNumber) => {
  activeTag.value = tagNumber;
};
const handleActiveListUpdate = (listNumber) => {
  activeList.value = listNumber;
};

const arrowPath = computed(() => {
  if (mouseOverNav.value && showNav.value) {
    return require("@/assets/images/hide.png");
  } else if (mouseOverNav.value && !showNav.value) {
    return require("@/assets/images/show.png");
  } else {
    return require("@/assets/images/line.png");
  }
});

const toggleNavigation = () => {
  showNav.value = !showNav.value;
  mouseOverNav.value = false;
};
</script>

<style>
main {
  background-color: rgb(248, 249, 250);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
}

img {
  height: 50px;
}

.arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin-left: 5px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  transition: all 0.5s;
}

.arrow-button:hover {
  background-color: rgb(191, 191, 191);
}

.visibility-arrows {
  height: 30px;
  transition: all 0.5s;
}

.visibility-arrows:hover {
  color: white;
}

.navbar-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.navbar-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.navbar-enter-active {
  transition: all 1s ease;
}

.navbar-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.navbar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.navbar-leave-active {
  transition: all 1s ease;
}
</style>
