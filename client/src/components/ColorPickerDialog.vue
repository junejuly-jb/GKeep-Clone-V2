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
                value="red"
                color="red"
            ></v-radio>
            <v-radio
                label="Pink"
                value="pink"
                color="pink"
            ></v-radio>
            <v-radio
                label="Purple"
                value="purple"
                color="purple"
            ></v-radio>
            <v-radio
                label="Indigo"
                value="indigo"
                color="indigo"
            ></v-radio>
            <v-radio
                label="Blue"
                value="blue"
                color="blue"
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
            color="blue darken-1"
            text
            @click="btnSetColor"
          >
            Set {{note_color}}
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
          await this.$http.post('http://localhost:3000/api/update-color/' + this.note_colorID,
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