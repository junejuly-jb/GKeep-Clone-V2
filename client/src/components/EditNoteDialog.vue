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
                    v-model="title"
                ></v-text-field>
                <v-textarea
                outlined
                name="input-7-4"
                label="Note"
                v-model="content"
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
            @click="update"
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
    props: ['toggleEditDialog', 'updateSelectedNote'],
    data: function(){
        return{
            
        }
    },
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
        },
        content:{
            get(){
                return this.updateSelectedNote.content
            },
            set(value){
                this.$emit('updateContent', value)
            }
        },
        title:{
            get(){
                return this.updateSelectedNote.title
            },
            set(value){
                this.$emit('updateTitle', value)
            }
        }
    },
    methods:{
        update(){
            
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>

</style>