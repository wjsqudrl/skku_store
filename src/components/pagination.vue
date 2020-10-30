<template>
    <v-row align="center" justify="center">
            
        <v-col cols="12" align="center" justify="center" style="padding-bottom:0px;">
            페이지: {{ footer.page }} / {{ numberOfPages }}
        </v-col>

        <v-col cols="12" align="center" justify="center" style="padding-top:2px;">
            <v-btn outlined fab x-small @click="formerPage" >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn outlined fab x-small @click="nextPage" >
                <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12"></v-col>
    </v-row>
          
</template>

<script>
export default {
    props:['footer', 'filteredArray'],
    data() {
        return {       

        }
    },
    methods: {
        // 푸터 관련 로직
        nextPage () {
            if (this.footer.page + 1 <= this.numberOfPages) this.$emit('nextPage')
        },
        formerPage () {
            if (this.footer.page - 1 >= 1) this.$emit('formerPage') 
        }
    },
    computed: {
        // 푸터 관련 변수
        numberOfPages() {
            return Math.ceil(this.filteredArray.length / this.footer.itemsPerPage)
        },
    },
}
</script>

<style>

</style>