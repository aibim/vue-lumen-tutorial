<template>
    <v-toolbar dark color="primary">
        <v-toolbar-title>Vue Lumen Tutorial</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat to="/">
                Start
            </v-btn>
            <v-menu offset-y left open-on-hover v-if="companies">
                <template v-slot:activator="{ on }">
                    <v-btn flat v-on="on">
                        Firmen
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-tile :to="{ name: 'company', params: { id: company.id}}" v-for="company in companies"
                                 :key="company.id">
                        <v-list-tile-title>
                            {{company.name}}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-menu offset-y left open-on-hover v-if="products">
                <template v-slot:activator="{ on }">
                    <v-btn flat v-on="on">
                        Produkte
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-tile :to="{ name: 'product', params: { id: product.id}}" v-for="product in products"
                                 :key="product.id">
                        <v-list-tile-title>
                            {{product.name}}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn flat to="/contact" v-if="products">
                Kontakt
            </v-btn>
            <v-menu v-if="isLoggedIn" open-on-hover offset-y left>
                <template v-slot:activator="{ on }">
                    <v-btn flat v-on="on">
                        Admin
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-tile to="/admin">
                        <v-list-tile-action>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            Adminbereich
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile to="/" @click.prevent="logout">
                        <v-list-tile-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            Logout
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn v-else icon to="/login">
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        props: ['companies', 'products'],
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
    }
</script>