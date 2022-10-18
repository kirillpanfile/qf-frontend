import { defineComponent, onMounted, reactive } from "vue"
import { VBreadcrumb, TreeSelect, AdminBlock, VInput, VSelect } from "@/components/"
import { useRecipeStore, refs } from "@/store"

const { tags } = refs(useRecipeStore())
const { getTags } = useRecipeStore()

const breadcrumbs = [
    { name: "Home", link: "/admin" },
    { name: "Recipe", link: "/admin/recipe" },
    { name: "Create", link: "/admin/recipe/create" },
]

const langs = [
    { _id: "en", name: "English" },
    { _id: "ru", name: "Russian" },
    { _id: "ro", name: "Romanian" },
]

const setup = (_, { emit }) => {
    onMounted(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("AdminCreateRecipe mounted")
        }
        getTags()
    })

    const recipe = reactive({
        title: "",
        description: "",
        lang: "en",
        tags: [],
    })

    return {
        breadcrumbs,
        langs,
        recipe,
        tags,
    }
}

export default defineComponent({
    name: "AdminCreateRecipe",
    components: {
        VBreadcrumb,
        AdminBlock,
        VInput,
        TreeSelect,
        VSelect,
    },
    setup,
})
