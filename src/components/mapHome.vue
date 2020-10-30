<template>
    <v-card flat style="background-color:#1a1c1f;">
        <v-card-text>
        <naver-maps
            ref="map"
            :height="300" 
            :mapOptions="mapOptions"
            :initLayers="['BACKGROUND', 'BACKGROUND_DETAIL', 'BYCYCLE', 'CADASTRAL', 'CTT', 'HIKING_TRAIL', 'PANORAMA', 'POI_KOREAN', 'TRANSIT']"
            @load="onLoad">
            <div v-if="afterRenderingMaps">
                <naver-marker  :lat="37.554229748867" :lng="126.97474860534089" @click="onMarkerClicked" @load="onMarkerLoaded"/>
            </div>
        </naver-maps>
        </v-card-text>
        
        <v-col align="center" style="background-color:#1a1c1f;">
            <v-icon color="black" style="position:absolute;z-index:98; margin-top:-217px; margin-left:55px" >add_location</v-icon>
            <v-btn @click="clickLabelBtn" class="white--text" style="margin-top:-80px;z-index:100;" color="#FDCBF1" width="150px" height="50px" elevation="5">
                위치 지정 완료
            </v-btn>
        </v-col>
    </v-card>
</template>


<style>
.col   .v-application--wrap {
    min-height: 1vh !important;
}
</style>


<script>


export default {
    data(){
        return{
            //지도관련
            map:'',
            infoWindow:'',
            mapOptions: {
                lat: '37.5542297488677',
                lng: '126.97474860534089',
                zoom: 11,
                zoomControl: false,
                zoomControlOptions: {position: 'BOTTOM_CENTER'},
                mapTypeControl: true,
            },
            afterRenderingMaps:false,
            center:'',
            
        }
    },
    mounted(){
        
    },
    methods:{
        
        clickLabelBtn(){
			    let a = {}
			    a.lat = this.map.getCenter().lat()
			    a.lng = this.map.getCenter().lng()
                
                this.$emit('infoUpdate', a)
			    
		},
		onLoad(vue) {
			this.map = vue.map
			this.center = vue.map.getCenter()
            this.afterRenderingMaps = true
		},
		onMarkerClicked(event) {
            //번호 띄워 주면 될듯
        },
        onMarkerLoaded(vue) {
			//this.marker = vue.marker; //naver.maps.Marker
		},
    }
}
</script>

<style>
</style>