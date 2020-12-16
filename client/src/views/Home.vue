<template>
    <v-app>
        <v-card tile outlined>
        <v-toolbar flat>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon class="ml-4"><v-icon size="40" color="yellow">mdi-google-keep</v-icon></v-app-bar-nav-icon>
        
            <v-toolbar-title class="ml-3 mr-5">Google Keep CLONE</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-refresh</v-icon>
            </v-btn>

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
                    <v-icon>mdi-cog</v-icon>
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

            <div class="mx-4"></div>

            <v-avatar size="40">
                <img
                    src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/85221965_2668856169818185_7998544657929732096_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeE2aG4AH9FGMjNSuAy72r6jti0gOcBuDYa2LSA5wG4NhvB4hWUk64SfGWBxf395em1R33GJUPFfVceVcUWofsMK&_nc_ohc=35Ux5yVpzaEAX9wV7_I&_nc_ht=scontent.fmnl4-2.fna&oh=3c337a759c9e64941c0d4289b8e1a834&oe=5FD6F7CE"
                    alt="John"
                >
            </v-avatar>
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
                <v-list-item>
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

                <v-list-item v-for="(label, listIndex) in labels" :key="listIndex">
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
            <div style="padding: 0px 10%">
                <masonry
                    :cols="4"
                    :gutter="30"
                    v-if="myNotes.length != 0"
                    >
                        <div v-for="(note, index) in myNotes" :key="index" class="mt-5">
                            <v-card outlined>
                                <v-container>
                                    <div class="py-3"><h3>{{ note.title }}</h3></div>
                                    <div>{{ note.content }}</div>
                                </v-container>
                            </v-card>
                        </div>
                </masonry>

                <div v-else class="d-flex justify-center no_notes align-center"><span><v-icon large>mdi-magnify</v-icon> No notes found</span></div>
            </div>
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

    </v-app>
</template>
<script>
export default {
    data: () => ({
        drawer: true,
        dialog: false,
        sesh_err: '',
        model: 0,
        

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
        closeOnContentClick: false

    }),

    methods: {
        async notes(){
            await this.$http.get('http://localhost:3000/api/myNotes', { headers: { Authorization: 'Bearer ' + this.$auth.getToken() }})
            .then( (response) => {
                console.log(response.body)
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
                console.log(res.body.option)
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
        height: 100vh;
        color: gray;
        font-size: 45px; 
    }
</style>