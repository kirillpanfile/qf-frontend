import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        posts: [],
        notifications : ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!','Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aperiam!']
    }),
    getters:{ 
        newNotifications(){
            return this.notifications.slice(0,10);
        }
    },
    actions: {
        addPost(data){
            this.posts.push(data)
        }
    }
})