import { ref } from 'vue'

export function useLoader() {
    const loading = ref(false)
    const setLoader = (value) => (loading.value = value)

    return {
        loading,
        setLoader,
    }
}
