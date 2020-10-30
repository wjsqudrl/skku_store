<template>
  <div>
    <appbar :arrow="true">공지사항</appbar>
    <v-row>
      <v-col>
        <v-tabs color="grey darken-5" center-active>
          <!-- <v-tab>TOP 5</v-tab> -->
          <v-tab>공지사항</v-tab>
        
        <!-- TOP 10 -->
        <!-- <v-tab-item>
        </v-tab-item> -->
        <!-- TOP 10 끝 -->
        
        <!-- 회원가입 시작 -->
        <v-tab-item>

          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>
               자전거 수리 업체 모집관련
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                지금 연락주세요
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>

        </v-tab-item>
        <!-- 회원가입 끝 -->



        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import appbar from '../../components/appbar'

export default {
  components: {
    appbar,
  },

  mounted(){
    //  
  },
}
</script>
    
<style scoped>
</style>