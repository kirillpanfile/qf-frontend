<template>
    <div class="bg-gray-50">
        <slot name="header"></slot>
        <div class="flex bg-white overflow-hidden pt-16 h-screen">
            <slot name="aside"></slot>
            <div class="h-full w-full bg-gray-50 dark:bg-gray-900 relative overflow-y-auto">
                <slot name="view"></slot>
            </div>
        </div>
    </div>
</template>
