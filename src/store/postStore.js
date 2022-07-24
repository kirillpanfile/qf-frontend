import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        posts: []
    }),
    actions: {
        addPost(data){
            this.posts.push(data)
        }
    }
})