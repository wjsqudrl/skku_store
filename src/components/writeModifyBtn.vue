<template>
<v-row>
    <v-col cols="12">
        <v-slide-x-transition>
            <v-btn :disabled="disabled" v-show="completed" height="80px" outlined block type="submit" @click.prevent="click">
                {{ this.$route.params.id === 'new' ? '글쓰기' : '수정하기' }} 
            </v-btn>
        </v-slide-x-transition>
    </v-col>
    <v-col cols="12">
        <v-btn :disabled="disabled" height="80px" outlined block type="submit" @click.prevent="clickCancel"> 
            {{ this.$route.params.id === 'new' ? '글쓰기 취소' : '수정 취소' }} 
        </v-btn>
    </v-col>
</v-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: ['completed', 'disabled'],
    methods: {

        ...mapMutations({
            clickBack: 'clickBack'
            }),
        clickCancel(){
            this.clickBack(this)
        },
        click(){
            if(this.$route.params.id === 'new'){
                this.$emit('clickBtn', 'write')
            }else{
                this.$emit('clickBtn', 'modify')
            }
        }
    }

}
</script>

<style>

</style>