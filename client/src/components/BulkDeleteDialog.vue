<template>
    <v-row justify="center">
        <v-dialog
        v-model="dialog"
        persistent
        max-width="350"
        >
      <v-card>
        <v-card-title class="headline">
            Delete Selected?
        </v-card-title>
        <v-card-text>Selected notes will be deleted permanently. Do you wish to continue?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Revert
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteConf"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
    props: ['ids', 'bulkDialog'],
    computed: {
        dialog: {
            get(){
                return this.bulkDialog
            },
            set(value){
                if(!value){
                    return this.$emit('show')
                }
            }
        }
    },
    methods: {
        async deleteConf(){
            await this.$http.post('api/bulkDeleteNote', { noteId: this.ids }, {
                headers: {
                    Authorization: 'Bearer ' + this.$auth.getToken()
                }
            })
            .then(() => {
                this.$emit('onSuccessBulkDelete')
            })
            .catch( err => {
                this.$emit('onErrorBulkDelete', err)
            })
            .finally( () => {
                this.dialog = false
            })
        }
    }
}
</script>