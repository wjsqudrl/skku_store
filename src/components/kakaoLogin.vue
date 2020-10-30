<template>
  <v-row>
    <v-col cols="12" align="center" justify="center">
      <KakaoLogin
      api-key="e9daeb105d5f14b828789e6a2a50b1f4"
      image="kakao_account_login_btn_medium_wide"
      :on-success=onSuccess
      :on-failure=onFailure
      />
    </v-col>
  </v-row>
</template>

<script>
import KakaoLogin from 'vue-kakao-login'
// 네이티브 앱 키 Tooltip c7c79bc07d4d2f4538d9ef2ebd91989e
// REST API 키 Tooltip 66e112bad6ed1c35267171235fc42344
// JavaScript 키 Tooltip e9daeb105d5f14b828789e6a2a50b1f4
// Admin 키 Tooltip 4971094fd708c34215c7a697b95e8012
let onSuccess = (data) => {
  // console.log(data)
  console.log("success")
  //로그인 성공 시, API 호출
  Kakao.API.request({
    url: '/v2/user/me',
    success: function(res) {
      alert(JSON.stringify(res));
      // console.log(JSON.stringify(res));
    },
    fail: function(error) {
      alert(JSON.stringify(error));
      // console.log(JSON.stringify(error));
    }
  });
}
let onFailure = (data) => {
  // console.log(data)
  // console.log(JSON.stringify(data))
  console.log("failure")
}

export default {
  name: 'App',
  components: {
    KakaoLogin
  },
  methods: {
    onSuccess,
    onFailure
  }
}
</script>

<style>
</style>