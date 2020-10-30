<template>
  <div>
        <v-col cols="12">
            <v-card outlined>
                <v-card-title style="padding:0;margin:0">
                    <v-col style="padding:0;margin:0" align="center">
                        장소명
                    </v-col>
                </v-card-title>
                <v-divider></v-divider>

                <v-list style="padding:0;margin:0" class="overflow-y-auto" max-height="442" :height="winWidth < 700 ? 268 : 442">
                    <span v-if="info.length===0" class="caption" style="padding:10px;"> 지도에서 장소를 등록 해주세요</span>
                    <v-col>
                    <template v-for="(item,i) in info">
                        
                        <v-list-item style="padding:0;margin:0">
                            <v-col style="padding:0;margin:0" cols="2" class="subtitle-2" align="center">
                                {{ i+1 }}
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col style="padding:0;margin:0" cols="8" class="subtitle-2" align="center">
                                {{ item.name }}
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col style="padding:0;margin:0" cols="2" align="center">
                                <v-btn color="red" fab text small @click="removeElement(i)">
                                    <v-icon>remove_circle_outline</v-icon>
                                </v-btn>
                            </v-col>
                        </v-list-item>
                        <v-divider></v-divider>
                    </template>
                    </v-col> 
                </v-list>
            </v-card>
        </v-col>

        <v-col cols="12" align="center">
            <v-expand-x-transition>
                <v-btn @click="showResultBtnClick" v-if="resultBtnShow" style="margin-top:-75px;z-index:100;" color="blue"  width="150px" height="50px" rounded elevation="5">
                    <div style="color:white">
                        결과 보기
                    </div>
                </v-btn>
            </v-expand-x-transition>
        </v-col>


  </div>
</template>

<script>
export default {
    props:['winWidth', 'info', 'resultBtnShow', 'token'],
    data(){
        return{

        }
    },
    methods:{
		showResultBtnClick(){
			this.$router.replace('result/' + this.token)
        },
        
		async removeElement(i){
            this.$emit('removeElement', i)
		},
    }

}
</script>

<style>

</style>