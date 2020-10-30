<template>
  <div class="black">
    <appbar :arrow="true">관리 페이지</appbar>
  <v-row>
      <v-col cols="12">
          <v-card flat>
              <v-card-title>아티스트 관리 웹 페이지란?</v-card-title>
              <v-card-text>
                  앱 내에서 할 수 없는 설정들 혹은<br>
                  앱 내에서 보기에는 불편한 통계 및 데이터 분석 자료들을<br>
                  데스크탑의 큰 화면에서 편하게 보여드리기 위한 페이지 입니다<br>
                  예) 나의 인스타 계정에서 타투업 계정으로 사진 받아오기<br><br>

                  따라서, 아티스트 관리 웹페이지는 데스크탑 기기에서만 접속이 가능합니다.
              </v-card-text>
          </v-card>
      </v-col>
      <v-col cols="12">

          <v-card flat>
              <v-card-title>접속 주소</v-card-title>
              <v-card-text>
                  데스크탑으로 아래의 주소로 접속해 주세요!<br><br>
                  tattooup.co.kr/artist
            </v-card-text>
              
          </v-card>
      </v-col>
  </v-row>
  </div>
</template>

<script>
import appbar from '../components/appbar'
export default {
  components:{
    appbar,
  },
    data(){
        return{

        }
    },
    mounted(){
        //  
    },
}
</script>

<style>

</style>