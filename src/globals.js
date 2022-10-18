export const initComponents = (app) => {
    /**
     * @description A directive to track clicks outside an element
     */
    app.directive("outside", {
        beforeMount(el, binding) {
            el.clickOutsideEvent = function (event) {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value()
                }
            }
            document.addEventListener("click", el.clickOutsideEvent)
        },
        unmounted(el) {
            document.removeEventListener("click", el.clickOutsideEvent)
        },
    })
}
