<template>
  <div>
    <appbar :arrow="true">앱 설정</appbar>


    <v-bottom-sheet v-model="sheet" max-width="calc(100% - 0px)" scrollable inset>
      <template v-slot:activator="{ on }">
        <v-row align="center">
          <v-col>

            <!-- 메뉴 시작 부분 -->
            <v-list class="black" style="padding:3px 3px 8px 3px;">
              <template v-for="(item, index) in items">
                <v-subheader
                style="font-size:12px;padding-left:0px;"
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
                ></v-subheader>
                <v-list-item
                dense
                style="background-color:#2F2F2F;min-height:5px;"
                v-else
                :key="item.title"
                @click="click(item.key)"
                >
                  <v-list-item-content style="padding:0px;">
                      <v-list-item-title v-html="item.title" style="font-size:14px;"></v-list-item-title>
                  </v-list-item-content>
                  
                  <v-list-item-icon>
                      <v-icon style="color:#9A9A9A;">keyboard_arrow_right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider
                :key="index"
                :inset="item.inset"
                ></v-divider>
              </template>
            </v-list> 
            <!-- 메뉴 끝 부분 -->
          </v-col>
        </v-row>
      </template>

      <v-card style="background-color:#1a1c1f">
          <v-card-title>
              {{ title }}
              <v-spacer></v-spacer>
              <v-btn class="mt-6" text @click="sheet = !sheet">
                  닫기
              </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{ content }}
          </v-card-text>
          <v-divider></v-divider>
      </v-card>
                    
    </v-bottom-sheet>


    <v-bottom-sheet v-model="sheet2" max-width="calc(100% - 0px)" scrollable inset>
      <template v-slot:activator="{ on }">
        <v-row>
          <v-col cols="12">
            <!-- 메뉴 시작 부분 -->
            <list v-for="item in items" :key="item.key" :item="item"></list>
            <!-- 메뉴 끝 부분 -->
          </v-col>
          <v-col cols="12" align="center">
            <v-card flat><v-card-text> <v-btn @click="clickData" text>개인정보처리방침</v-btn> | <v-btn @click="clickService" text>이용약관</v-btn></v-card-text></v-card>
          </v-col>
        </v-row>
      </template>

      <v-card style="background-color:#1a1c1f">
          <v-card-title>
              {{ title }}
              <v-spacer></v-spacer>
              <v-btn class="mt-6" text @click="sheet2 = !sheet2">
                  닫기
              </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{ content }}
          </v-card-text>
          <v-divider></v-divider>
      </v-card>
                    
    </v-bottom-sheet>

    <!-- 스낵바 -->
    <snack-bar :type="type" v-if="snackbar"></snack-bar>
    <!-- 스낵바 끝 -->

  </div>
</template> 
 
<script>
import appbar from '../../components/appbar'
import snackBar from '../../components/snackBar'
import { mapGetters, mapActions } from 'vuex'
import { dbUpdate } from '../../firebase'
import myMenuList from '../../components/myMenuList'
import list from '../../components/list'
import bus from '../../utils/bus';

export default{
  async created(){
    await bus.$emit('start:spinner')
  },
  async mounted(){
    await bus.$emit('end:spinner')
    //  
  },
  data() {
    return {
      type: 'logoutBtnClick',
      sheet: false,
      sheet2: false,
      title: '',
      content: '',
      //스낵바
      snackbar: false,
      title: '',
      content: '',
    }
  },
  components: {
    appbar,
    list,
    snackBar,
  },
  computed: {
    ...mapGetters({
      userProfile: 'getUserProfile',
      openRule: 'getOpen',
      dataRule: 'getData',
      serviceRule: 'getService',
    }),
    items() {      
      return [
        {
          title: '오픈소스 라이선스',
          key:'open',
        },
        {
          title: '로그 아웃',
          key:'logoutBtnClick',
        }  
      ]
    },
   
  },
  watch:{
    snackbar(){
      if(this.snackbar === true){
        // console.log(this.snackbar)
        this.t = setTimeout(() => {
          this.snackbar = false
        }, 2000)
        // console.log(this.snackbar)
      }
    }
  },
  methods: {

    clickData(){
      this.title = '개인정보처리방침'
      this.sheet = true
      this.content = this.dataRule
    },
    clickService(){
      this.title = '이용약관'
      this.sheet = true
      this.content = this.serviceRule
    },
    click(key){
      console.log('click')
      if(key === 'open'){
        this.title = '오픈소스 라이선스'
        this.sheet = true
        this.content = this.openRule
      }else if(key === 'logoutBtnClick'){
        this.snackbar = true
      }
    },
    ...mapActions({
      fetchUserProfile: 'fetchUserProfile', // commons.js
    }),
  }
}
</script>
    

<style scoped>
</style>
