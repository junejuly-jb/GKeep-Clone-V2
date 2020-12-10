<template>
    <v-app>
        <v-container>
            <div class="main d-flex align-center">
                <v-card
                    class="mx-auto"
                    width="450"
                    outlined
                >
                    <div class="text-center heading">Google Keep CLONE</div>
                    <div class="overline text-center">Register</div>
                    <v-container>
                        <div class="px-4 py-5">
                            <v-text-field
                                v-model="user.name"
                                dense
                                label="Name"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                v-model="user.email"
                                dense
                                label="Email"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                v-model="user.password"
                                dense
                                label="Password"
                                outlined
                                type="password"
                            ></v-text-field>
                            <v-text-field
                                v-model="cpassword"
                                dense
                                label="Confirm Password"
                                outlined
                                type="password"
                            ></v-text-field>
            
                            <div class="sub">
                                <small>have an account? Click<v-btn to="/login" text x-small color="blue darken-1" dark>here</v-btn></small>
                            </div>
                            <div class="text-right">
                                <v-btn
                                @click="register"
                                color="blue darken-1"
                                dark
                                >
                                    Register
                                </v-btn>
                            </div>
                            
                        </div>
                    </v-container>
                </v-card>
            </div>           
        </v-container>



        <v-snackbar
            v-model="snackbar"
            >
            {{ err_msg }}

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
        user: {},
        error: false,
        cpassword: '',
        err_msg: '',
        snackbar: false
    }),
    methods: {
        async register(){
            if(this.user.password != this.cpassword){
                this.snackbar = true
                this.err_msg = 'Password mismatch'
            }
            else{
                await this.$http.post('http://localhost:3000/api/register', this.user)
                .then( res => {
                    if(res.body.success == false){
                        this.snackbar = true
                        this.err_msg = res.body.message
                    }
                    else{   
                        this.snackbar = true
                        this.err_msg = res.body.message
                    }
                })
                .catch( err => {
                    console.log(err)
                })
            }
        }
    }
}
</script>
<style scoped>
    .main{
        height: 100vh;
    }
    .heading{
        padding: 30px 0px 0px 20px;
        font-size: 19px;
        color: gray;
    }
    .sub{
        padding: 0px 0px 60px 0px;
    }
</style>