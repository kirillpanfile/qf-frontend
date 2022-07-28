import { defineStore } from 'pinia'

export const useCardStore = defineStore('cardStore', {
    state: () =>({
        cells: ['Tomato','Apple','Olive Oil','Raddish'],
        ingredients: ['butter mealted (460g)',
            'brown sugar (440g)',
            'granulated sugar (400g)',
            'eggs (4)',
            'vanilla extract', 
            'baking powder',
            'chocolate chips (700g)']
    })
})