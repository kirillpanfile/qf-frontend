/**
 * @description Form Validation Helper
 * @param {object} data options object
 * @key `min` minimum length
 * @key `max` maximum length
 * @key `required` required field
 * @key `pattern` pattern to match
 * @key `type` type of field
 */

import { watch, reactive } from 'vue'

export default function validator(data) {
    data.forEach((element) => {
        const { reference, rules } = element

        if (!reference) console.error('Reference is not defined')
        const { min, max, required, pattern, type } = rules
        let timer = null

        watch(reference, (e) => {
            !(typeof e.value == type) && console.error('Type is not correct')
            clearTimeout(timer)
            timer = setTimeout(() => {
                var valid = true
                if (e.value.length < min)
                    valid = {
                        value: false,
                        message: `Minimum length is ${min}`,
                    }
                if (e.value.length > max) valid = false
                if (required && e.value.length == 0) valid = false
                // if(pattern && !pattern.test(e.value)) valid = false
                e.valid = valid
            }, 500)
        })
    })
}

export const createValidator = () =>
    reactive({
        value: '',
        valid: {}, //true or false
        // message: '',
    })
