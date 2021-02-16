<template>
    <v-dialog
      v-model="show"
      persistent
      max-width="250"
    >
      <v-card>
        <v-card-title class="headline">
          Choose Color
        </v-card-title>
        <v-card-text>
            <v-radio-group
            v-model="selected_color"
            column
            >
            <v-radio
                label="Default"
                value="default"
                color="gray"
            ></v-radio>
            <v-radio
                label="Red"
                value="custom_red"
                color="custom_red"
            ></v-radio>
            <v-radio
                label="Orange"
                value="custom_orange"
                color="custom_orange"
            ></v-radio>
            <v-radio
                label="Yellow"
                value="custom_yellow"
                color="custom_yellow"
            ></v-radio>
            <v-radio
                label="Green"
                value="custom_green"
                color="custom_green"
            ></v-radio>
             <v-radio
                label="Teal"
                value="custom_teal"
                color="custom_teal"
            ></v-radio>
            <v-radio
                label="Blue"
                value="custom_blue"
                color="custom_blue"
            ></v-radio>
            <v-radio
                label="Purple"
                value="custom_purple"
                color="custom_purple"
            ></v-radio>
             <v-radio
                label="Pink"
                value="custom_pink"
                color="custom_pink"
            ></v-radio>
             <v-radio
                label="Brown"
                value="custom_brown"
                color="custom_brown"
            ></v-radio>
             <v-radio
                label="Gray"
                value="custom_gray"
                color="custom_gray"
            ></v-radio>
            </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            text
            @click="show = false"
          >
            Close
          </v-btn>
          <v-btn
            color="teal"
            text
            @click="btnSetColor"
          >
            Set
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['visible','note_color', 'note_colorID'],
    
    
    data: function(){
      return {
        color: ''
      }
    },
    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                this.$emit('close')
                }
            }
        },
        selected_color: {
          get(){
            return this.note_color
          },
          set(value){
            this.color = value
          }
        }
    },
    methods: {
        async btnSetColor(){
          // console.log(this.color)
          await this.$http.post('api/update-color/' + this.note_colorID,
            { color: this.color }, { headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then(() => {
                this.$emit('success', this.color)
            })
            .catch(err => {
              this.$emit('error', err)
            })
        }
    }
}
</script>