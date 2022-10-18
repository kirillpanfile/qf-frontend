import { useTaskStore } from "./modules/task"
import { useAdminStore } from "./modules/admin"
import { useRecipeStore } from "./modules/recipe"
import { useCardStore } from "./modules/card"

import { storeToRefs } from "pinia"

export { useTaskStore, useAdminStore, useRecipeStore, useCardStore }
export const refs = (_) => storeToRefs(_)
