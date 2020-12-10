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
                                dense
                                label="Name"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Email"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                dense
                                label="Password"
                                outlined
                                type="password"
                            ></v-text-field>
                            <v-text-field
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
    </v-app>
</template>
<script>
export default {
    data: () => ({

    })
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