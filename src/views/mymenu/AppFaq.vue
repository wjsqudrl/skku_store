<template>
  <div>
    <appbar :arrow="true">자주묻는질문</appbar>
    <v-row>
      <v-col>
        <v-tabs color="grey darken-5" center-active>
          <!-- <v-tab>TOP 5</v-tab> -->
          <v-tab>회원가입</v-tab>
          <v-tab>리뷰관리</v-tab>
          <v-tab>이용문의</v-tab>
          <v-tab>불편문의</v-tab>
          <v-tab>기타</v-tab>
        
        <!-- TOP 10 -->
        <!-- <v-tab-item>
        </v-tab-item> -->
        <!-- TOP 10 끝 -->
        
        <!-- 회원가입 시작 -->
        <v-tab-item>

          <v-expansion-panels focusable>

            <v-expansion-panel>
              <v-expansion-panel-header>
                회원가입은 어떻게 하나요?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                로그아웃을 하신 후에, 마이 메뉴 버튼을 클릭 하세요.
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>

        </v-tab-item>
        <!-- 회원가입 끝 -->

        <!-- 이용문의 시작 -->
        <v-tab-item>
          <v-expansion-panels focusable>

            <v-expansion-panel>
              <v-expansion-panel-header>
                앱 이용 문의는 어디에 물어보면 되나요?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                마이메뉴 > 고객센터 > 1:1 상담하기 버튼을 누르셔서 상담하시면 됩니다.
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
        </v-tab-item>
        <!-- 이용문의 끝 -->

        <!-- 불편문의 시작 -->
        <v-tab-item>
          <v-expansion-panels focusable>

            <v-expansion-panel>
              <v-expansion-panel-header>
                불편사항은 어디에 신고하면 될까요?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                micrsoft114@gmail.com 에 메일 보내주시면 됩니다.
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>

        </v-tab-item>
        <!-- 불편문의 끝 -->

        <!-- 기타 시작 -->
        <v-tab-item>
          <v-expansion-panels focusable>

            <v-expansion-panel>
              <v-expansion-panel-header>
                로그아웃은 어떻게 하나요?
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                마이메뉴 > 앱설정 > 로그아웃 버튼을 클릭하시면 됩니다.
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>

        </v-tab-item>
        <!-- 기타 끝 -->

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