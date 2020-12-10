<template>
    <v-app>
        <v-container class="wrapper">
            <div class="main d-flex align-center justify-center">
                <!-- <div class="d-flex justify-center align-center">
                    <span>
                        <img src='../assets/keep.png' alt="" width="100">
                    </span>
                    <span class="gkeep ml-5">Google Keep <span class="clone">Clone</span></span>
                </div> -->
                <div style="width: 55%" color="info">
                    <v-row>
                        <v-col cols="4" class="text-right"><img src='../assets/keep.png' alt="" width="100"></v-col>
                        <v-col>
                            <div style="height: 100%" class="d-flex align-center justify-emd">
                                <span class="gkeep">Google Keep <span class="clone">Clone</span></span>
                            </div>
                        </v-col>
                    </v-row>
                    
                    <div style="width: 50%" class="ml-auto mr-auto mt-5">
                        <v-btn block>
                            Login
                        </v-btn>
                    </div>
                    <div style="width: 50%" class="ml-auto mr-auto mt-3">
                        <v-btn block color="primary">
                            Register
                        </v-btn>
                    </div>
                </div>
                
            </div>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

.wrapper{
    font-family: 'Open Sans', sans-serif;
}
.main{
    height: 100vh;
}
.gkeep{
    font-size: 35px;
    color: gray;
}
.clone{
    font-weight: 600;
}
</style>