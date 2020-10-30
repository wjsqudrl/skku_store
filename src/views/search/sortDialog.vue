<template>
    <div> 
        <v-dialog v-model="dialog" width="350">
            <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                    {{ sortByName }}
                    <v-icon>
                        keyboard_arrow_down
                    </v-icon>
                </v-btn>
            </template>

            <v-card class="grey darken-3">
            <v-row>
                <v-col align="center" cols="12">
                    <v-btn :disabled="disabled" tile block text @click="$store.commit('setSortBy','createdAt')">최신순</v-btn>
                </v-col>
            </v-row>
            </v-card>

            <v-card class="grey darken-3">
            <v-row>
                <v-col align="center" cols="12">
                    <v-btn :disabled="disabled" tile block text @click="$store.commit('setSortBy','hits')">조회수순</v-btn>
                </v-col>
            </v-row>
            </v-card>


            <v-card class="grey darken-3">
            <v-row>
                <v-col align="center" cols="12">
                    <v-btn :disabled="disabled" tile block text @click="$store.commit('setSortBy','price')">낮은가격순</v-btn>
                </v-col>
            </v-row>
            </v-card>
            <br>

            <v-card class="grey darken-3">
            <v-row>
                <v-col cols="12" align="center">
                <v-btn :disabled="disabled" tile block text @click="dialog = false">취소</v-btn>
                </v-col>
            </v-row>
            </v-card>

        </v-dialog>

    </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            disabled: false,
        }
    },
    computed:{    
    ...mapGetters({
      sortBy:'getSortBy',
      
    }),
        sortByName(){
            let a = ''
            if(this.sortBy === 'createdAt'){
                a = '최신순'
            }else if(this.sortBy === 'hits'){
                a = '조회수순'
            }else if(this.sortBy === 'price'){
                a = '낮은가격순'
            }
            this.dialog = false
            this.$emit('sortByChange', this.sortBy)
            return a
        }
    }
}
</script>

<style>

</style>