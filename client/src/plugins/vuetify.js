import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                custom_red: "#F28B82",
                custom_orange: "#FBBC04",
                custom_yellow: "#FBBC04",
                custom_green: "#CCFF90",
                custom_teal: "#A7FFEB",
                custom_blue: "#CBF0F8",
                custom_darkblue: "#AECBFA",
                custom_purple: "#D7AEFB",
                custom_pink: "#FDCFE8",
                custom_brown: "#E6C9A8",
                custom_gray: "#E8EAED"
            },
            dark: {
                custom_red: "#5C2B29",
                custom_orange: "#614A19",
                custom_yellow: "#635D19",
                custom_green: "#345920",
                custom_teal: "#16504B",
                custom_blue: "#2D555E",
                custom_darkblue: "#1E3A5F",
                custom_purple: "#42275E",
                custom_pink: "#5B2245",
                custom_brown: "#442F19",
                custom_gray: "#3C3F43"
            }
        }
    }
});
