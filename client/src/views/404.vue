<template>
    <v-app>
        <v-container>
            <div class="main d-flex justify-center align-center">
                <div class="text-center">
                    <span class="statusCode">404</span>
                    <h1 class="pnf">Page Not found</h1>
                    <div class="sub">The page you requested was not found, and we have <br> a fine guess why. If you type the URL <br> directly please make sure <br> the spelling is correct</div>

                    <v-btn class="blue darken-1" dark to="/">Go Back</v-btn>
                </div>
            </div>
        </v-container>
    </v-app>
</template>
<style scoped>
.main{
    height: 100vh;
}
.statusCode{
    font-size: 100px;
    color: darkgoldenrod;
}
.pnf{
    color: rgb(70, 70, 70);
}
.sub{
    color: gray;
    padding-bottom: 40px;
}
</style>