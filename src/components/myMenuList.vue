<template>
<div>
    <v-list class="black" style="padding:3px 3px 8px 3px;">
        <template v-for="(item, index) in items" v-if="item.show">
            <v-subheader
            style="font-size:12px;padding-left:0px;"
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
            ></v-subheader>

            <v-list-item
            :ripple="false"
            dense
            style="background-color:#2F2F2F;min-height:5px;"
            v-else
            :key="item.title"
            :href="item.href ? item.href: null"
            @click="item.url ? $router.push(item.url) : null "
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
    </div>
</template>
<script>

export default {
  props:['items']

}
</script>
    

<style scoped>

</style>