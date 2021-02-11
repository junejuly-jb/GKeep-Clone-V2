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
                    <div class="overline text-center">Login</div>
                    <v-container>
                        <v-form>
                            <div class="px-4 py-5">
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
                                <div class="text-center pb-4">
                                    <small><v-btn text x-small color="blue darken-1" dark>Forgot password?</v-btn></small>
                                </div>
                                <div class="sub">
                                    <small>Don't have an account? Click<v-btn to="/register" text x-small color="blue darken-1" dark>here</v-btn></small>
                                </div>
                                <div class="text-right">
                                    <v-btn
                                    color="blue darken-1"
                                    @click="login"
                                    dark
                                    >
                                        Login
                                    </v-btn>
                                </div>
                            </div>
                        </v-form>
                    </v-container>
                </v-card>
            </div>           
        </v-container>

        <!-- snackbar  -->

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
        user: {},
        snackbar: false,
        msg: ''
    }),
    methods: {
        async login(){
            await this.$http.post('http://localhost:3000/api/login', this.user)
            .then( response => {
                if(response.body.success == false){
                    this.snackbar = true
                    this.msg = response.body.message
                }
                else{
                    this.$auth.setToken(response.body.token, response.body.exp)
                    this.$router.push('/home')
                    localStorage.setItem('user-options', JSON.stringify(response.body.user.options))
                }
            })
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