<template>
    <!-- <v-toolbar flat height="80"> -->
    <v-app-bar flat :height="appBarHeight" fixed app>
        <br>
        <br>
        <slot name="text-field" ></slot>              
        
        <div class="flex-grow-1"></div>
        
        <slot name="filter-button"></slot>
    
    </v-app-bar>

    <!-- </v-toolbar> -->
</template>

<script>

import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;


export default {
    data() {
        return {
            appBarHeight:'80px',
            info:'',
        }
    },
    async mounted(){
        this.info = await Device.getInfo()
        this.appBarHeight = this.info.operatingSystem === 'ios' ? '120px' : '80px'
    }
}
</script>

<style scoped>
.theme--dark.v-icon {
    color:#757575;
}
</style>