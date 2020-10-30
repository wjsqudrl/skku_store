<template>
	<v-app>
        <v-row>
            
            <v-col style="background-color:#1a1c1f;margin:0;padding:0" cols="12">
                <v-tabs v-model="tab" center grow>
                    <!-- <v-tab>
                        지도로 찾기
                    </v-tab> -->
                    <v-tab>
                        주소로 찾기
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" touchless>
                    <!-- <v-tab-item>
                        <map-home @infoUpdate="infoUpdate"></map-home>
                    </v-tab-item> -->
                    <v-tab-item>
                        <daum-post @address="address"></daum-post>
                    </v-tab-item>
                </v-tabs-items>
                
            </v-col>
        </v-row>
	</v-app>
</template>

<style>

.override   .v-application--wrap {
    min-height: 1vh !important;
}
</style>

<script>

import { dbRead, dbWrite, dbUpdate, dbRemove } from '../firebase'
import firebase from 'firebase/app'
import axios from 'axios'
import mapList from './mapList'
import mapHome from './mapHome'
import daumPost from './daumPost'


export default {
    components:{
        mapList,
        mapHome,
        daumPost
	},
    data(){
        return{
            tab:null,
        }
	},
	methods:{
        address(result){
            this.$emit('addr', result)
        },
        infoUpdate(item){
            this.$emit('infoUpdate', item)
        }
		
	}
}



</script>