<template>
  <v-card flat>
    <v-card-title>
      업체주소 설정
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <div id="map" style="width:100%;height:300px;"></div>
    </v-card-text>

      <v-bottom-sheet v-model="showDialog" max-width="calc(100% - 0px)" scrollable inset>
        <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
            <v-card-title>
                지역 찾기
                <v-spacer></v-spacer>
                <v-btn class="mt-6" text @click="showDialog = !showDialog">
                    닫기
                </v-btn>
            </v-card-title>

            <v-divider style="border-color:#707070; color:#707070;"></v-divider>

            <v-card-text>
                <map-view @addr="addr" @infoUpdate="infoUpdate"></map-view>
            </v-card-text>

            <v-divider style="border-color:#707070; color:#707070;"></v-divider>
            
        </v-card>
      </v-bottom-sheet>

    <v-card-actions v-if="isBtn">
      <v-btn :disabled="disabled || latLngDisabled" @click="showDialog = !showDialog" outlined block elevation="2">
          위치 설정
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import mapView from '../components/mapView'
import VueDaumMap from "vue-daum-map";
import { dbUpdate, dbQuery } from '../firebase.js';
export default {
    props:['authorProfile', 'disabled', 'isBtn'],
    components:{
      mapView
    },
    data(){
        return{
            afterSetMapOptions:false,
            afterRenderingMaps:false,
            // map:'',
            // center:'',
            // marker: '',
            // mapOptions: {
            //   lat: '',
            //   lng: '',
            //   zoom: 11,
            //   zoomControl: true,
            //   zoomControlOptions: {position: 'BOTTOM_CENTER'},
            //   mapTypeControl: true,
            // },
            latLngDisabled: false,

            
            address:{},
            showDialog:false,
            shopList:[],
            latLng:{lat:'',lng:''},
            map: null

        }
    },
    created(){

    },
    async mounted(){
        console.log('mounted')
        this.lat = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lat : 37.554229748867 : 37.554229748867
        this.lng = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lng : 126.97474860534089 : 126.97474860534089
        // console.log(this.mapOptions.lat)
        // console.log(this.mapOptions.lng)
        this.afterSetMapOptions = true
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e112bad6ed1c35267171235fc42344&libraries=services';
            document.head.appendChild(script);
        }
        
    },
    watch:{
      // marker(){
      //   console.log('watch marker')
      //   // console.log(this.marker)
      //   // console.log(this.map)
      //   // console.log(this.center)
      //     this.marker.setOptions({
      //       map:this.map,
      //       position: this.center
      //     })
      // },
      // map(){
      //   console.log('watch map')
      //   console.log(this.marker)
      //   console.log(this.map)
      //   console.log(this.center)
      //   this.marker.setOptions({
      //     map:this.map,
      //     position: this.center
      //   })
      // },
      // center(){
      //   console.log('watch center')
      //   console.log(this.marker)
      //   console.log(this.map)
      //   console.log(this.center)
      //     this.marker.setOptions({
      //       map:this.map,
      //       position: this.center
      //     })
      // }
    },
    methods:{
        // onLoad(vue) {
        //   console.log('onLoad')
        //   this.map = vue.map
        //   this.center = vue.map.getCenter()
        //   // console.log(this.center)
        //   this.afterRenderingMaps = true
        // },
        // updateLatLng(){
        //   console.log('updateLatLng')
        //   this.latLngDisabled = true
        //   this.center = this.map.getCenter()
        //   let lat = this.center.lat()
        //   let lng = this.center.lng()
        //   this.marker.setOptions({
        //     map:this.map,
        //     position: this.center
        //   })
        //   this.$emit('updateLatLng', {lat:lat, lng:lng})
        // },
        // onMarkerClicked(event) {
        // },
        // onMarkerLoaded(vue) {
        //   console.log('onMarkerLoaded')
        //   this.marker = vue.marker; //naver.maps.Marker
        // },
        // async getCurrentLocation(){
        //   await navigator.geolocation.getCurrentPosition(pos => {
        //   this.latLng.lat = pos.coords.latitude
        //   this.latLng.lng = pos.coords.longitude
        //   }, err => {
        //   })
        // },
        infoUpdate(item){
            this.latLng = item
            this.showDialog = false
        },
        async addr(result){
            this.address = result
            console.log(this.address.name)
            await dbUpdate('userProfiles', this.authorProfile.id, {address: this.address.name})
            await this.searchSubmit(this.address.name)
            this.showDialog = false
        },
        searchSubmit(addr) {
          var geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(addr, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {

                  let bounds = new kakao.maps.LatLngBounds();

                  result.forEach(async (data)=>{
                      bounds.extend(new kakao.maps.LatLng(data.y, data.x));
                      console.log(data.y, data.x)
                      await dbUpdate('userProfiles', this.authorProfile.id, {latLng: {lat:data.y, lng:data.x} })
                      var markerPosition  = new kakao.maps.LatLng(data.y, data.x); 
                      var marker = new kakao.maps.Marker({
                          position: markerPosition
                      });
                      marker.setMap(this.map);

                  })
                  // console.log(data.y, data.x)
                  // await dbUpdate('userProfiles', this.authorProfile.id, {latLng: {lat:data.y, lng:data.x} })
                  this.map.setBounds(bounds);
                  
              }
          });
        },
        initMap() {
            let container = document.getElementById('map');
            let options = {
                center: new kakao.maps.LatLng(this.lat, this.lng),
                level: 3
            };
            var markerPosition  = new kakao.maps.LatLng(this.lat, this.lng); 
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });

            let map = new kakao.maps.Map(container, options);

            // this.map = map;
            marker.setMap(map);
            map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
            // this.geocoder = new kakao.maps.services.Geocoder();
            this.map=map
        },
    }
    

}
</script>

<style>
.info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
</style>