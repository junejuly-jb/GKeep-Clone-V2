<template>
    <v-app>
        <v-card tile outlined>
        <v-toolbar flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon class="ml-4"><v-icon size="40" color="yellow">mdi-google-keep</v-icon></v-app-bar-nav-icon>
        
            <v-toolbar-title class="ml-3 mr-5">Google Keep CLONE</v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </template>
                <span>Refresh</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon v-show="!listView" @click="listView = true">
                        <v-icon>mdi-view-agenda-outline</v-icon>
                    </v-btn>
                </template>
                <span>List View</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon v-show="listView" @click="listView = false">
                        <v-icon>mdi-view-grid-outline</v-icon>
                    </v-btn>
                </template>
                <span>Grid View</span>
            </v-tooltip>

            <!-- <v-btn icon @click="gridView = false" v-show="gridView">
                <v-icon>mdi-view-agenda-outline</v-icon>
            </v-btn>

            <v-btn icon @click="gridView = true" v-show="!gridView">
                <v-icon>mdi-view-grid-outline</v-icon>
            </v-btn> -->


            <v-menu
                bottom
                left
                offset-y
                :close-on-content-click="closeOnContentClick"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-cog-outline</v-icon>
                </v-btn>
                </template>

                <v-list>
                <v-list-item>
                        <v-switch
                        v-model="darkModeSwitch"
                        @click="onClickToggleDarkMode"
                        small
                        inset
                        :label="`Enable dark mode`"
                        ></v-switch>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <span class="col align-items-center">Edit Profile</span>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>
                        <span class="col align-items-center">Help</span>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <span class="col align-items-center">Send feedback</span>
                    </v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>


            <!-- <v-avatar size="40">
                <img
                    src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/85221965_2668856169818185_7998544657929732096_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeE2aG4AH9FGMjNSuAy72r6jti0gOcBuDYa2LSA5wG4NhvB4hWUk64SfGWBxf395em1R33GJUPFfVceVcUWofsMK&_nc_ohc=35Ux5yVpzaEAX9wV7_I&_nc_ht=scontent.fmnl4-2.fna&oh=3c337a759c9e64941c0d4289b8e1a834&oe=5FD6F7CE"
                    alt="John"
                >
            </v-avatar> -->

            <v-menu
                bottom
                left
                offset-y
                :close-on-content-click="closeOnContentClick"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <div class="py-5 px-5 text-center">
                            <v-avatar
                            color="primary"
                            size="63"
                            ><span class="white--text headline">JBA</span></v-avatar>
                            <h3>June Aragoncillo</h3>
                            <p class="caption mt-1">
                                june@gmail.com
                            </p>
                        </div>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>
                            <v-btn text block color="red" @click="logout">Logout</v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
        </v-card>
        <v-navigation-drawer v-model="drawer" app>
           <v-list
                nav
                dense
                shaped
            >
                <v-list-item-group
                v-model="model"
                mandatory
                color="amber"
                >
                <v-list-item @click="filtering = false">
                    <v-list-item-title>
                        <span><v-icon>mdi-lightbulb-outline</v-icon></span>
                        <span class="ml-5"></span>
                        <span class="col align-items-center">Notes</span>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>
                        <span><v-icon>mdi-bell-outline</v-icon></span>
                        <span class="ml-5"></span>
                        <span class="col align-items-center">Reminders</span>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item v-for="(label, listIndex) in labels" :key="listIndex" @click="onClickFilter(label)">
                    <v-list-item-title>
                        <span><v-icon>mdi-label-outline</v-icon></span>
                        <span class="ml-5"></span>
                        <span class="col align-items-center">{{label}}</span>
                    </v-list-item-title>
                </v-list-item>


                <v-list-item @click="labelDialog = true">
                    <v-list-item-title>
                        <span><v-icon>mdi-pencil-outline</v-icon></span>
                        <span class="ml-5"></span>
                        <span class="col align-items-center">Edit Label</span>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title><span><v-icon>mdi-archive-outline</v-icon></span>
                    <span class="ml-5"></span>
                    <span class="col align-items-center">Archive</span></v-list-item-title>
                </v-list-item>
                
                <v-list-item>
                    <v-list-item-title>
                        <span><v-icon>mdi-trash-can-outline</v-icon></span>
                        <span class="ml-5"></span>
                        <span class="col align-items-center">Trash</span>
                    </v-list-item-title>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <div class="content-wrapper">
            <div class="pt-5">
                <v-card transition="slide-x-transition" v-show="!typingMode" max-width="650" style="margin: auto;" class="mb-5 rounded-lg">
                    <v-container>
                        <div @click="typingMode = true">Take a note . . .</div>
                    </v-container>
                </v-card>
                <v-card transition="slide-x-transition" v-show="typingMode" max-width="650" style="margin: auto;" class="mb-5 rounded-lg">
                        <v-container>
                            <div class="pb-4 px-3">
                                <!-- <input type="text" placeholder="Title" class="search" v-model="form.title"> -->
                                <v-text-field
                                    label="Title"
                                    v-model="newNote.title"
                                ></v-text-field>
                            </div>
                            <div class="px-3">
                                <!-- <textarea class="search" placeholder="Take a note . . ." rows="4" v-model="form.content"></textarea> -->
                                <v-textarea
                                    label="Take a note..."
                                    v-model="newNote.content"
                                ></v-textarea>
                            </div>
                        </v-container>
                        <v-container>
                            <v-card-actions>
                                <!-- <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-tag-outline</v-icon></v-btn>
                                    </template>
                                     <span>Add tag</span>
                                </v-tooltip> -->

                                <v-select
                                    prepend-icon="mdi-tag-outline"
                                    v-model="newNote.tags"
                                    :items="c_tag"
                                    chips
                                    label="Add label"
                                    multiple
                                    solo
                                ></v-select>

                                <v-spacer></v-spacer>
                                <v-btn text @click="typingMode = false">Close</v-btn>
                                <v-btn text color="blue darken-1" @click="btnAddNote">Save</v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </div>
            <!-- FOR GRID VIEW  (NOT FILTERING)-->
            <div style="padding: 0px 7%" v-show="!listView && !filtering">
                <masonry
                    :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
                    :gutter="{default: '30px', 700: '10px'}"
                    >
                        <div v-for="(note, index) in myNotes" :key="index" class="mt-5">
                            <v-card outlined>
                                <v-container>
                                    <div class="float-right">
                                        <v-icon small>mdi-circle-outline</v-icon>
                                    </div>
                                    <div class="py-2"><h5>{{ note.title }}</h5></div>
                                    <p>{{ note.content }}</p>
                                    <div class="mt-3 mb-4">
                                        <v-chip
                                        class="mr-1"
                                        outlined
                                        v-for="(noteTags, i) in note.tags"
                                        :key="i" small
                                        >
                                        {{noteTags}}
                                        </v-chip>
                                    </div>
                                    <div class="d-flex">
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn x-small fab icon v-bind="attrs" v-on="on"><v-icon>mdi-tag-outline</v-icon></v-btn>
                                                </template>
                                                <span>Add tag</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small @click="deleteSingleNote(note, index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                                </template>
                                                <span>Delete</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                                </template>
                                                <span>Edit</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-archive-outline</v-icon></v-btn>
                                                </template>
                                                <span>Archive</span>
                                            </v-tooltip>
                                        </div>
                                    </div>
                                </v-container>
                            </v-card>
                        </div>
                </masonry>
            </div>

            <!-- FOR GRID VIEW (FILTERING) -->

            <div style="padding: 0px 7%" v-show="!listView && filtering">
                <masonry
                    :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
                    :gutter="{default: '30px', 700: '10px'}"
                    >
                        <div v-for="(note, index) in filteredNotes" :key="index" class="mt-5">
                            <v-card outlined>
                                <v-container>
                                    <div class="float-right">
                                        <v-icon small>mdi-circle-outline</v-icon>
                                    </div>
                                    <div class="py-2"><h5>{{ note.title }}</h5></div>
                                    <p>{{ note.content }}</p>
                                    <div class="mt-3 mb-4">
                                        <v-chip
                                        class="mr-1"
                                        outlined
                                        v-for="(noteTags, i) in note.tags"
                                        :key="i" small
                                        >
                                        {{noteTags}}
                                        </v-chip>
                                    </div>
                                    <div class="d-flex">
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn x-small fab icon v-bind="attrs" v-on="on"><v-icon>mdi-tag-outline</v-icon></v-btn>
                                                </template>
                                                <span>Add tag</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small @click="deleteSingleNote(note, index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                                </template>
                                                <span>Delete</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                                </template>
                                                <span>Edit</span>
                                            </v-tooltip>
                                        </div>
                                        <div>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn v-bind="attrs" v-on="on" fab icon x-small><v-icon>mdi-archive-outline</v-icon></v-btn>
                                                </template>
                                                <span>Archive</span>
                                            </v-tooltip>
                                        </div>
                                    </div>
                                </v-container>
                            </v-card>
                        </div>
                </masonry>
            </div>


            <!-- FOR LIST VIEW  (NOT FILTERING)-->
            <div style="padding: 0px 7%" v-show="listView && !filtering">
                <div v-for="(note, index) in myNotes" :key="index" class="mt-5">
                    <v-card outlined>
                        <v-container>
                            <div class="float-right">
                                <v-icon small>mdi-circle-outline</v-icon>
                            </div>
                            <div class="py-2"><h5>{{ note.title }}</h5></div>
                            <p>{{ note.content }}</p>
                            <div class="mt-3 mb-4">
                                <v-chip
                                class="mr-1 mb-1"
                                outlined
                                v-for="(noteTags, i) in note.tags"
                                :key="i" small
                                >
                                {{noteTags}}
                                </v-chip>
                            </div>
                            <div class="d-flex">
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-tag-outline</v-icon></v-btn>
                                </div>
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                </div>
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                </div>
                            </div>
                        </v-container>
                    </v-card>
                </div>
            </div>



            <!-- FOR LIST VIEW (FILTERING) -->
            <div style="padding: 0px 7%" v-show="listView && filtering">
                <div v-for="(note, index) in filteredNotes" :key="index" class="mt-5">
                    <v-card outlined>
                        <v-container>
                            <div class="float-right">
                                <v-icon small>mdi-circle-outline</v-icon>
                            </div>
                            <div class="py-2"><h5>{{ note.title }}</h5></div>
                            <p>{{ note.content }}</p>
                            <div class="mt-3 mb-4">
                                <v-chip
                                class="mr-1 mb-1"
                                outlined
                                v-for="(noteTags, i) in note.tags"
                                :key="i" small
                                >
                                {{noteTags}}
                                </v-chip>
                            </div>
                            <div class="d-flex">
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-tag-outline</v-icon></v-btn>
                                </div>
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                </div>
                                <div>
                                    <v-btn fab icon x-small><v-icon>mdi-pencil-outline</v-icon></v-btn>
                                </div>
                            </div>
                        </v-container>
                    </v-card>
                </div>
            </div>
            <div v-if="myNotes.length == 0" class="d-flex justify-center no_notes align-center"><span><v-icon large>mdi-magnify</v-icon> No notes found</span></div>

        </div>



        <!-- dialog  end session -->

        <v-dialog
            v-model="dialog"
            persistent
            max-width="350"
            >
            <v-card>
                <v-card-title class="headline">
                Session Expired
                </v-card-title>
                <v-card-text> {{ sesh_err }} </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="logout"
                >
                    Okay
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- label dialog  -->
        <v-dialog
            v-model="labelDialog"
            persistent
            max-width="400"
            >
            <v-card>
                <v-card-title>
                Edit Label
                </v-card-title>
                <div style="width: 100%; padding: 0% 7% 0% 7%;">
                    <div class="d-flex justify-center align-center">
                        <v-text-field prepend-icon="mdi-plus" label="Add label" v-model="addLabel"></v-text-field>
                        <v-btn fab icon small @click="onAddLabelClick"><v-icon>mdi-check</v-icon></v-btn>
                    </div>
                    <div class="d-flex align-center py-2" v-for="(label, i) in labels" :key="i">
                        <span class="pr-4"><v-icon>mdi-label</v-icon></span>
                        <v-text-field v-if="labelEditMode === true && editedIndex == i" :value="label"></v-text-field>
                        <span v-else>{{ label }}</span>
                        <div class="ml-auto">
                            <v-btn small fab icon @click="btnDeleteLabel(label, i)"><v-icon>mdi-trash-can</v-icon></v-btn>
                            <v-btn v-if="labelEditMode === true && editedIndex == i" small fab icon @click="labelToggler(i)"><v-icon>mdi-check</v-icon></v-btn>
                            <v-btn v-else small fab icon @click="labelToggler(i)"><v-icon>mdi-pencil</v-icon></v-btn>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="labelDialog = false"
                >
                    Done
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        

        <!-- confirm delete dialog  -->

        <v-dialog
            v-model="confirmDeleteDialog"
            persistent
            max-width="350"
            >
            <v-card>
                <v-card-title class="headline">
                Delete this note?
                </v-card-title>
                <v-card-text>Deleted note will on trash for 20 days.</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="red darken-1"
                    text
                    @click="btnConfirmSingleDelete"
                >
                    Okay
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>


            <!-- snack bar  -->
            <v-snackbar
            v-model="snackbar"
            >
            {{ msg }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        drawer: true,
        dialog: false,
        sesh_err: '',
        model: 0,
        snackbar: false,   
        msg: '',
        typingMode: false, 
        form: {},

        // labels corner 
        labelDialog: false,
        labelEditMode: false,
        editedIndex: -1,
        labels: [],
        addLabel: '',
        myNotes: [],

        //user
        userInfo: '',

        // others
        darkModeSwitch: false,
        closeOnContentClick: false,

        // view
        listView: false,

        //notes
        delSelectedNoteIndex: -1,
        delSelectedNoteId: null,
        confirmDeleteDialog: false,
        newNote: {
            title: '',
            content: '',
            tags: []
        },
        c_tag: [],
        tempNotes: [],
        filteredNotes: [],
        filtering: false
    }),
    methods: {
        async notes(){
            await this.$http.get('http://localhost:3000/api/myNotes', { headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then( (response) => {
                this.myNotes = response.body
            })
            .catch( err => {
                if(err.status == 401){
                    this.dialog = true,
                    this.sesh_err = err.body.message
                }
            })
        },
        logout(){
            this.$auth.destroyToken()
            this.$router.push('/login')
        },

        async user(){
            await this.$http.get('http://localhost:3000/api/userDetails', {headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then( res => {
                this.labels = res.body[0].customTags
                this.c_tag = res.body[0].customTags
            })
            .catch( err => {
                console.log(err)
            })
        },


        btnDeleteLabel(label, i){
            console.log(label, i)
            this.labels.splice(i, 1)
        },


        labelToggler(i){
            this.labelEditMode = !this.labelEditMode
            this.editedIndex = i
        },


        async onAddLabelClick(){
            await this.$http.post('http://localhost:3000/api/addCustomTag', { tag: this.addLabel }, {headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then( response => {
                this.labels.push(response.body.tag)
            })
            .catch(err => console.log(err))
            .finally(() => { this.addLabel = ''})
        },


        async onClickToggleDarkMode(){
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

            await this.$http.post('http://localhost:3000/api/darkModeToggler', { val: this.darkModeSwitch }, {headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then( res => {
                localStorage.removeItem('user-options')
                localStorage.setItem('user-options', JSON.stringify(res.body.option))
            })
            .catch( err => console.log(err))
            .finally( () => {
                this.checkUserSetting()        
            })
        },


        checkUserSetting(){
            const userOptions = JSON.parse(localStorage.getItem('user-options'))
            // console.log(userOptions.darkmode)
            if(userOptions.darkmode == true){
                this.$vuetify.theme.dark = true
                this.darkModeSwitch = true
            }
            else{
                this.$vuetify.theme.dark = false
            }
        },


        deleteSingleNote(note, index){
            // console.log(note, index)
            this.delSelectedNoteIndex = index
            this.delSelectedNoteId = note._id
            this.confirmDeleteDialog = true
        },


        async btnConfirmSingleDelete(){
            await this.$http.post('http://localhost:3000/api/deleteNote', { note_id: this.delSelectedNoteId },
            {
                headers:{
                    Authorization: 'Bearer ' + this.$auth.getToken()
                }
            })
            .then(( res ) => {
                console.log(res.body)
                this.snackbar = true
                this.msg = res.body
            })
            .catch( err => {console.log(err)})
            .finally(() => {
                this.delSelectedNoteId = null
                this.confirmDeleteDialog = false
                this.myNotes.splice(this.delSelectedNoteIndex, 1)
            })
        },


        async btnAddNote(){
            await this.$http.post('http://localhost:3000/api/createNote', this.newNote,
            {
                headers: {
                    Authorization: 'Bearer ' + this.$auth.getToken()
                }
            })
            .then( res => {
                this.myNotes.push(res.body.data)
                this.snackbar = true
                this.msg = res.body.message
                this.typingMode = false
            })
            .catch( err => {
                this.snackbar = true
                this.msg = err.body.message
            })
            .finally( () => { this.newNote = {}})
        },


        onClickFilter(label){
            this.tempNotes = this.myNotes
            this.filtering = true
            this.filteredNotes = this.tempNotes.filter( notes => {
                return (notes.tags.indexOf(label) >= 0)
            })
        }
    },

    mounted(){
        this.notes()
        this.user()
        this.checkUserSetting()
    }
}
</script>

<style scoped>

    .no_notes{
        height: 70vh;
        color: gray;
        font-size: 45px;
    }
</style>