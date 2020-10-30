<template>
  <div>
    <appbar :arrow="true">고객 센터</appbar>

  </div>
</template> 
 
<script>
import appbar from '../../components/appbar'
import list from '../../components/list'
import { mapGetters } from 'vuex'

export default {
  components: {
    appbar,
    list,
  },
  created(){
   
  },
  data(){
    return {
      sheet: false,
    }
  },
  methods: {
  },
  mounted(){
    //  
  },
  computed: {
    ...mapGetters({
      
    }),
    items() {
      return [
      {
        key:'notice',
        url:'/notice',
        icon:`calendar_today`,
        content: '공지사항',
        for: 'common'
      },
      {
        key:'faq',
        url:'/faq',
        icon:`announcement`,
        content: '자주 묻는 질문',
        for: 'common'
      },
      {
        key:'1on1',
        url:'/faq',
        href:'http://pf.kakao.com/_XmxfeT/chat',
        icon:`question_answer`,
        content: '1:1 문의하기',
        for: 'common'
      }]
    }
  }
}
</script>
    

<style scoped>

</style>
