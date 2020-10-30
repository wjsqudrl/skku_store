<template>
<v-row>
    <v-col cols="12">
    </v-col>
    <v-col cols="12">
        <v-select
            ref="sel1"
            @change="change"
            v-model="filter.locationSelected"
            prepend-icon="map"
            :items="locations"
            small-chips
            outlined
            dense
            label="장소">
        </v-select>
        
        <v-select
            ref="sel2"
            @change="change"
            v-model="filter.genreClickedList"
            prepend-icon="face"
            :items="genres"
            small-chips
            outlined
            dense
            multiple
            label="장르">
        </v-select>

        <v-select
            ref="sel3"
            @change="change"
            v-model="filter.conceptClickedList"
            prepend-icon="redeem"
            :items="concepts"
            small-chips
            outlined
            dense
            multiple
            label="주제">
        </v-select>

        <v-select
            ref="sel4"
            @change="change"
            v-model="filter.partClickedList"
            prepend-icon="pan_tool"
            :items="parts"
            small-chips
            outlined
            dense
            multiple
            label="부위">
        </v-select>
    </v-col>
</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

    data(){
        return {
            prependIcon: false,
        }
    },
    methods:{
        change(){
            console.log('changed')
            this.$refs.sel1.blur()
            this.$refs.sel2.blur()
            this.$refs.sel3.blur()
            this.$refs.sel4.blur()
        }
    },
    props: ['filter'],
    computed: {
        ...mapGetters({
            // 정해진 메뉴들
            locations: 'getLocations', // search.js
            genres: 'getGenres',
            concepts: 'getConcepts',
            parts: 'getParts',
        })
    }

}
</script>

<style>

</style>