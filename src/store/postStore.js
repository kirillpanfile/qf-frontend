import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        posts: [],
        notifications: [
            {
                username: 'andrii123',
                message: 'submited a new recipe',
                date: '2020-01-01',
                id: 1,
            },
            {
                username: 'hesoyam',
                message: 'submited a new recipe',
                date: '2020-01-01',
                id: 2,
            },
            {
                username: 'baguvix',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
            {
                username: 'TonyStark',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
            {
                username: 'John Wick',
                message: 'submited a new recipe',
                date: '2020-01-01',
            },
        ],
    }),
    getters: {
        newNotifications() {
            return this.notifications.slice(0, 10)
        },
    },
    actions: {
        addPost(data) {
            this.posts.push(data)
        },
    },
})
