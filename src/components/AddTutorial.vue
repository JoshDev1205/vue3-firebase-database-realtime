<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button
        @click="saveTutorial"
        class="btn btn-success"
      >
        Submit
      </button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button
        class="btn btn-success"
        @click="newTutorial"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTutorialDb } from '../composables/useTutorialsDb'

const tutorialService = useTutorialDb()

interface Tutorial {
  title: string
  description: string
  published: boolean
}

const tutorial = ref<Tutorial>({
  title: '',
  description: '',
  published: false,
})

const submitted = ref(false)

const saveTutorial = async () => {
  try {
    const data = {
      title: tutorial.value.title,
      description: tutorial.value.description,
      published: false,
    }

    await tutorialService.create(data)

    console.log('Created new item successfully!')
    submitted.value = true
  } catch (error) {
    console.log('🚀 ~ file: AddTutorial.vue:80 ~ saveTutorial ~ error:', error)
  }
}

const newTutorial = () => {
  submitted.value = false
  tutorial.value = {
    title: '',
    description: '',
    published: false,
  }
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
