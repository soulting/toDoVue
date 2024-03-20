<template>
  <transition name="task">
    <div
      v-if="
        !task.completed &&
        (selectedTag === 1 || (selectedTag === 2 && task.favorite))
      "
      @mouseover="mouseOverTask = true"
      @mouseout="mouseOverTask = false"
      class="task"
    >
      <div class="task-left">
        <div
          class="task-icon"
          @mouseover="mouseOverTaskIcon = true"
          @mouseout="mouseOverTaskIcon = false"
        >
          <img
            v-if="!mouseOverTaskIcon"
            @click="markAsCompleted"
            src="@/assets/images/tick.png"
            alt="completion checkbox"
          />
          <img
            v-else
            @click="markAsCompleted"
            src="@/assets/images/tick-selected.png"
            alt="completion checkbox"
          />
        </div>

        <p>{{ task.description }}</p>
      </div>
      <div v-show="mouseOverTask || task.favorite" class="task-right">
        <button>
          <img src="@/assets/images/dots.png" alt="dots image" />
        </button>
        <button @click="toggleFavorite">
          <img
            v-if="!task.favorite"
            src="@/assets/images/favorite.png"
            alt="dots image"
          />
          <img
            v-else
            src="@/assets/images/favorite-selected.png"
            alt="dots image"
          />
        </button>
      </div></div
  ></transition>
</template>

<script setup>
import { computed, ref } from "vue";
import completeTask from "@/composables/completeTask";
import markFavorite from "@/composables/markFavorite";
const props = defineProps({
  task: {
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

const mouseOverTask = ref(false);
const mouseOverTaskIcon = ref(false);

const toggleFavorite = async () => {
  try {
    const response = await markFavorite(props.selectedList, props.task.task_id);
    if (response.message === "completed") {
      emit("reload");
    }
  } catch (error) {
    throw error;
  }
};

const markAsCompleted = async () => {
  try {
    const response = await completeTask(props.selectedList, props.task.task_id);
    if (response.message === "completed") {
      emit("reload");
    }
  } catch (error) {
    throw error;
  }
};
</script>

<style>
.task {
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 25px;
}
.task:hover {
  background-color: rgb(226, 226, 226);
}
.task button {
  height: 20px;
  width: 20px;
  border: none;
  background-color: transparent;
}
.task img {
  height: 20px;
}
.task-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.task-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.task-enter-from {
  opacity: 0;
}
.task-enter-to {
  opacity: 1;
}
.task-enter-active {
  transition: all 0.5s ease;
}

.task-leave-from {
  opacity: 1;
}
.task-leave-to {
  opacity: 0;
}
.task-leave-active {
  transition: all 0.5s ease;
}
</style>
