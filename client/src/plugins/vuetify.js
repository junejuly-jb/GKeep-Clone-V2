import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                red: "#EF5350",
                pink: "#EC407A",
                purple: "#AB47BC",
                indigo: "#5C6BC0",
                blue: "#42A5F5",
            },
            dark: {
                red: "#C62828",
                pink: "#AD1457",
                purple: "#6A1B9A",
                indigo: "#283593",
                blue: "#1565C0",
            }
        }
    }
});
