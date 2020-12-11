<template>
    <v-app>
        <v-app-bar app color="white" elevate-on-scroll>
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

            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>

            <div class="mx-4"></div>

            <v-avatar size="40">
                <img
                    src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/85221965_2668856169818185_7998544657929732096_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeE2aG4AH9FGMjNSuAy72r6jti0gOcBuDYa2LSA5wG4NhvB4hWUk64SfGWBxf395em1R33GJUPFfVceVcUWofsMK&_nc_ohc=35Ux5yVpzaEAX9wV7_I&_nc_ht=scontent.fmnl4-2.fna&oh=3c337a759c9e64941c0d4289b8e1a834&oe=5FD6F7CE"
                    alt="John"
                >
            </v-avatar>
        </v-app-bar >
        <v-navigation-drawer v-model="drawer" app>
           <v-list
                nav
                dense
                shaped
            >
                <v-list-item-group
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

                <v-list-item @click="labelModal = true">
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
                
        </div>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        drawer: false
    })
}
</script>