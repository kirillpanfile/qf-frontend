<template>
    <admin-card
        title="Chocolate Chip Cookies"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet eget augue vel elementum. Ut eu euismod velit. Nam in hendrerit augue."
        :temperature="true"
        :cells="['Tomato', 'Apple', 'Corn']"
        :ingredients="['Baking powder', 'Chocolate', 'Sugar', 'Potato']"
        :time="32"
        :steps="['Wash the frying pan','Turn 10ml of vegetable oil','Put the dough into the pan with strong fire',`Turn 100ml of beer 'Beliy Medved'`,'Cook until dough is hard and crispy','Decorate the plate with some cucumbers and tomatoes','Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum veniam debitis totam doloribus non voluptatum, quasi aspernatur dicta incidunt sequi eveniet a. Quam a eligendi minima eveniet vitae deserunt quas tempora. Mollitia quod adipisci expedita, ad aliquid deleniti iste facere!']"
    ></admin-card>
</template>

<script setup>
import AdminCard from '@/components/Admin/AdminCard.vue'
</script>