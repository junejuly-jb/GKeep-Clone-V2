<template>
    <v-row justify="center">
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Edit Note
        </v-card-title>
        <v-card-text>
            <div class="my-3">
                <v-text-field
                    label="Title"
                    outlined
                    dense
                ></v-text-field>
                <v-textarea
                outlined
                name="input-7-4"
                label="Note"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>
            </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="editDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
    props: ['toggleEditDialog'],

    computed: {
        editDialog: {
            get(){
                return this.toggleEditDialog
            },
            set(value) {
                if(!value){
                    this.$emit('closeEditModal')
                }
            }
        }
        
    }
}
</script>
<style scoped>

</style>