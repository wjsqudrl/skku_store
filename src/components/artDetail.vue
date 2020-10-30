<template>
    <v-card flat>
      <v-card-title>
        상세 정보
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row> 
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                가격
              </v-card-title>
              <v-card-text>
                {{item? item.data().price : null}} 만원
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                장소
              </v-card-title>
              <v-card-text>
                {{item? item.data().location : null}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                장르
              </v-card-title>
              <v-card-text>
                {{item? item.data().genre : null}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                주제
              </v-card-title>
              <v-card-text>
                {{item? item.data().concept : null}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                부위
              </v-card-title>
              <v-card-text>
                {{item? item.data().part : null}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                예상시간
              </v-card-title>
              <v-card-text>
                {{item? item.data().timeExpected: null}} 시간
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                예상횟수
              </v-card-title>
              <v-card-text>
                {{ item? item.data().numExpected : null}} 회
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card flat>
              <v-card-title>
                크기
              </v-card-title>
              <v-card-text>
                {{ item? item.data().size : null }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style>

</style>