<template>
    <v-card flat>
        <v-card-title>
            {{ item? item.data().title : null }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ item? item.data().content : null }}
        </v-card-text>
    </v-card>  
</template>

<script>
export default {
    props: ['item'],

}
</script>

<style>

</style>