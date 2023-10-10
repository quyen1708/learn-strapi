import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { createApp } from 'vue'
import { createVuetify, ThemeDefinition } from 'vuetify'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        defaultTheme: 'dark'
    }
});
