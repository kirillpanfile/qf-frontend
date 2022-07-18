<template>
    <div class="admin-create-post">
        <div class="admin-create-post__left">
            <input type="text" placeholder="Name...">
            <textarea cols="30" rows="10" placeholder="Description..."></textarea>
            <div class="admin-create-post__preparation"></div>
        </div>
        <div class="admin-create-post__right">
            <input class="input-image" type="file">
            <div class="admin-create-post__ingredients"></div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'AdminCreatePost',
    setup(){
        const ingredients = ref(['Tomato','Falafel','Potato','Egg','Mayonaise','Crab Meat'])
        return{
            ingredients
        }
    }
}
</script>
