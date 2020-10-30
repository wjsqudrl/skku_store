<template>
    <div>
    <v-list>
        <v-list-item>
            <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            
            <v-list-item-content>
                <v-list-item-title>{{ item.content }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
                <v-switch color="info" inset height="0px" dense flat v-model="isToggledChild"></v-switch>
            </v-list-item-icon>

        </v-list-item>
    </v-list>
    <v-divider></v-divider>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['item'],
    data(){
        return {
            isToggledChild: '',
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile'
        })
    },
    watch: {
        isToggledChild(newVal, oldVal) {
            if(oldVal !== ''){
                console.log('watch')
                this.$emit('isToggledChild', {key:this.item.key, value:this.isToggledChild})

            }
        }
    },
    created() {
        // console.log(this.item.key)
        // console.log(this.userProfile.data()[this.item.key])
        this.isToggledChild = this.userProfile.data()[this.item.key]
    }
}
</script>

<style>

</style>