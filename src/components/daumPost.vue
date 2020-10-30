<template>
    <v-app style="background-color:#1a1c1f;">
        <v-container style="background-color:#1a1c1f;">
            <v-col class="overflow-y-auto" style="background-color:#1a1c1f;">
                <v-card flat style="background-color:#1a1c1f;">    
                    <template>
                        <VueDaumPostcode style="width:100%; height: 420px; overflow: scroll;" @complete="clickCode($event)" />
                    </template>
                </v-card>
            </v-col>
        </v-container>
    </v-app>
    
  
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode"
import axios from 'axios'
export default {
    components:{
        VueDaumPostcode
    },
    data(){
        return{
            result:'',
        }
    },
    mounted(){
    },
    methods:{
        async clickCode(result){
            //let url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + result.address
            
            // let params = {
            //         query: result.address
            //     }
            // let headers = {
            //     'X-NCP-APIGW-API-KEY-ID': 'okgble74an',//process.env.VUE_APP_NAVER_MAPS_CLIENT_ID,
            //     'X-NCP-APIGW-API-KEY': 'wBbIjRzt5l8pdl5FVmTzYBUs4GJ5iroPFjZ9av66'//process.env.VUE_APP_NAVER_MAPS_CLIENT_SECRET

            // }
            // const options = {
            //         method: 'GET',
            //         headers: headers,
            //         data: params,
            //         url:url,
            //     };
            
            // let a = await axios.get(url, { headers:headers })            
            //let a = await axios(options);
            let param = {
                adr:result.address
            }

            //let b = await axios.post('http://coronaview.com:3000/geocode/',param)
            
            let a = {
                //lat:b.data.y,
                //lng:b.data.x,
                name:result.address
            }

            this.$emit('address', a)
        }
    },

}
</script>

<style>

</style>