<template>
    <div>
        {{displayName}}
    </div>      
</template>

<script>
import { dbRead, dbQuery } from '../firebase'

export default {
    data(){
        return{
            displayName: ''
        }
    },
    props:['item'],
    async created(){       
        let b = await dbQuery('userProfiles', 'uid', '==', this.item.authorUid)
        this.displayName = b[0].data().displayName
        
    }

}
</script>

<style>

</style>