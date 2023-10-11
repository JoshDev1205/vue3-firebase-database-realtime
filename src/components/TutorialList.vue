<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button
        class="m-3 btn btn-sm btn-danger"
        @click="removeAllTutorials"
      >
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <tutorial-details
          :tutorial="currentTutorial"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Tutorial {
  key: string
  title: string
  description: string
  published: boolean
}
import { onBeforeMount, onMounted, ref } from 'vue'
import { useTutorialDb } from '../composables/useTutorialsDb'
import { onValue, off } from 'firebase/database'
import TutorialDetails from './Tutorial.vue'

const tutorialService = useTutorialDb()

const tutorials = ref<Tutorial[]>([])
const currentTutorial = ref(null)
const currentIndex = ref(-1)

const onDataChange = (items) => {
  const _tutorials: Tutorial[] = []
  items.forEach((item) => {
    const key = item.key
    const data = item.val()
    _tutorials.push({
      key,
      title: data.title,
      description: data.description,
      published: data.published,
    })

    tutorials.value = _tutorials
  })
}

const refreshList = () => {
  currentTutorial.value = null
  currentIndex.value = -1
}

const setActiveTutorial = (tutorial, index) => {
  currentTutorial.value = tutorial
  currentIndex.value = index
}

const removeAllTutorials = async () => {
  try {
    await tutorialService.deleteAll()
    refreshList
  } catch (error) {
    console.log(
      '🚀 ~ file: TutorialList.vue:86 ~ removeAllTutorials ~ error:',
      error
    )
  }
}

onMounted(() => {
  onValue(tutorialService.getAll(), onDataChange)
})

onBeforeMount(() => {
  off(tutorialService.getAll())
})
</script>

<style lang="scss" scoped></style>
