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

            if( type === 'number' ){
                timer = setTimeout(() => {
                    var valid = true
                    var message = ''

                    if(e.value < min)
                        {
                            valid = false,
                            message = `Minimum value is ${min}`
                        }
                    if(e.value > max){
                        {
                            valid = false,
                            message = `Maximum value is ${max}`
                        }
                    }
                    e.valid = valid
                    e.message = message
                    console.log(e.value)
                }, 500)
            } else {
                timer = setTimeout(() => {
                    var valid = true
                    var message = ''

                    if (e.value.length < min)
                        {
                            valid = false
                            message = `Minimum value is ${min}`
                        }
                    if (e.value.length > max)
                        {
                            valid = false,
                            message = `Maximum value is ${max}`
                        }
                    if (required && e.value.length == 0) valid = false
                    // if(pattern && !pattern.test(e.value)) valid = false
                    e.valid = valid
                    e.message = message
                }, 500)             
            }           
        })
    })
}

export const createValidator = (payload) =>
    reactive({
        value: payload,
        valid: true, //true or false
        message: '', // message: '',
        
    })
