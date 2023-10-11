import { useDatabase } from 'vuefire'
import { ref, get, push, update, child, remove } from 'firebase/database'

export function useTutorialDb() {
  const db = useDatabase()
  const dbRef = ref(db, 'joshdev/tutorials')

  return {
    getAll() {
      return dbRef
    },
    create(tutorial) {
      return push(dbRef, tutorial)
    },
    update(key, value) {
      return update(child(dbRef, `${key}`), value)
    },
    delete(key) {
      return remove(child(dbRef, `${key}`))
    },
    deleteAll() {
      return remove(dbRef)
    },
  }
}
