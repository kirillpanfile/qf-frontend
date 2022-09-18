import { defineComponent, ref, watch, computed, onMounted } from "vue"
import { createRefs } from "@/helpers"
import { VBadge } from "@/components"

const setup = (props, { emit }) => {
    const inputData = ref(null)
    const [filteredItems, selectedItems] = createRefs([], 2)
    const { data, by } = props

    let timer = null

    /**
     * @description Filter items by search query
     */
    watch(inputData, (val) => {
        //if timer is not null, clear it
        if (timer) {
            clearTimeout(timer)
        }

        //if search query is empty, set filtered items to []
        timer = setTimeout(() => {
            if (val) {
                const itemsToShow = data.filter((item) => {
                    return !selectedItems.value.includes(item) && item[by].toLowerCase().includes(val.toLowerCase())
                })

                filteredItems.value = [...itemsToShow].filter((item) => {
                    //if item is an object, check if it has a property that matches the search query
                    const searchItem = eval(`item.${by}`)
                    console.log(searchItem.toLowerCase().includes(val.toLowerCase()))
                    return searchItem.toLowerCase().includes(val.toLowerCase())
                })
            } else {
                filteredItems.value = []
            }

            //* convert items by SearchBy `by` prop
        }, 400)
    })

    //function to return items in search and replace 'by' prop with 'name' prop
    /**
     * @param {Array} items - items to convert
     * @returns {Array} converted items
     */

    //clear filtered items on select
    const clearData = () => (filteredItems.value = [])

    // emit selected items
    const selectItem = (item) => {
        //if item is not already selected, add it to selected items
        selectedItems.value = [...selectedItems.value, item]

        // update the model
        updateModel(selectedItems.value)

        //clear input data
        clearData()
    }

    // update model on select (v-model)
    const updateModel = (val) => emit("update:modelValue", val)

    return {
        inputData,
        selectedItems,
        filteredItems,
        clearData,
        selectItem,
    }
}

const props = {
    data: { type: Array, required: true },
    modelValue: { type: Array, default: () => [] },
    by: { type: String, default: false },
}

export default defineComponent({
    name: "ThreeSelect",
    components: { VBadge },
    props,
    setup,
})
