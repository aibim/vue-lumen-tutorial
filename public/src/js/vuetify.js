import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import de from 'vuetify/es5/locale/de'

Vue.use(Vuetify, {
    iconfont: 'mdi',
    lang: {
        locales: {de},
        current: 'de'
    },
})
