<template>
  <div
    v-if="currentTutorial"
    class="edit-form"
  >
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? 'Published' : 'Pending' }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button
      class="btn btn-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button
      type="submit"
      class="btn btn-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useTutorialDb } from '../composables/useTutorialsDb'

const tutorialService = useTutorialDb()

interface Tutorial {
  key: string
  title: string
  description: string
  published: boolean
}
interface Props {
  tutorial: Tutorial
}

const props = defineProps<Props>()
const emit = defineEmits(['refreshList'])

const currentTutorial = ref<Tutorial>()
const message = ref('')

onMounted(() => {
  message.value = ''
  currentTutorial.value = { ...props.tutorial }
})

watch(
  () => props.tutorial,
  (tutorial) => {
    currentTutorial.value = { ...tutorial }
    message.value = ''
  }
)

const updatePublished = async (status) => {
  try {
    await tutorialService.update(currentTutorial.value?.key, {
      published: status,
    })
    currentTutorial.value!.published = status
    message.value = 'The status was updated successfully!'
  } catch (error) {
    console.log('🚀 ~ file: Tutorial.vue:108 ~ updatePublished ~ error:', error)
  }
}

const updateTutorial = async () => {
  try {
    const data = {
      title: currentTutorial.value?.title,
      description: currentTutorial.value?.description,
    }
    await tutorialService.update(currentTutorial.value?.key, data)

    message.value = 'The tutorial was updated successfully!'
  } catch (error) {
    console.log('🚀 ~ file: Tutorial.vue:122 ~ updateTutorial ~ error:', error)
  }
}

const deleteTutorial = async () => {
  try {
    tutorialService.delete(currentTutorial.value?.key)
    emit('refreshList')
  } catch (error) {
    console.log('🚀 ~ file: Tutorial.vue:130 ~ deleteTutorial ~ error:', error)
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
