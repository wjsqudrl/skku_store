<template>
    <v-card flat tile>
        <v-container>
            <v-row>
                <v-col cols="12" align="center">
                    <v-card flat>
                            <v-date-picker
                                flat
                                v-model="dates"
                                show-current
                                full-width 
                                multiple
                                color="success"
                                header-color="transparent"
                                min="2020-01-01"
                                max="2020-12-31"
                                :readonly="isAuthor ? false : true"
                                :disabled="disabled"
                                
                            ></v-date-picker>
                    </v-card>
                </v-col>
                <v-col cols="12"  align="center">
                    <v-btn x-small outlined fab class="success">n</v-btn>
                    : 예약 가능한 날짜
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { dbUpdate } from '../firebase'

export default {
    props: ['isAuthor', 'authorProfile'],
    data() {
        return{
            dates: [],
            disabled:false,
        }
    },
    watch: {
        async dates() {
            console.log('watch')
             
            this.disabled = true
            let input = {dates: this.dates}
            await dbUpdate('userProfiles', this.userProfile.id, input)
            this.disabled = false
             
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
        })
    },
    created(){
        this.dates = this.authorProfile.data().dates ? this.authorProfile.data().dates : []
    }

}
</script>

<style>

</style>