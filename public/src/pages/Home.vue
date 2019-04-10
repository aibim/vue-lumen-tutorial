<template>
    <v-content v-if="products">
        <v-layout grey lighten-2>
            <v-flex xs12 offset-sm2 sm8>
                <v-container grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12 mb-4>
                            <h1 class="display-3">Vue Lumen Tutorial</h1>
                            <div class="subheading my-3">Willkommen auf der SPA des Vue Lumen Tutorials</div>
                            <v-btn class="mx-0" color="primary" large :to="{ name: 'contact'}">
                                Kontaktanfrage stellen
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-flex xs12 offset-sm2 sm8>
            <v-container grid-list-lg>
                <div class="text-xs-center" v-if="isLoading">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                <v-alert type="warning" v-if="hasAPIError">
                    <h4 class="alert-heading">API nicht erreichbar!</h4>
                    <span>Leider ist die API nicht erreichbar, wodurch Ihnen aktuell keine Produkte und Firmen angezeigt werden können.</span>
                    <v-divider class="my-3"></v-divider>
                    <span class="mb-0">Bitte versuchen Sie es später noch einmal oder <router-link class="alert-link"
                                                                                                   :to="{ name: 'contact'}">kontaktieren Sie uns</router-link>.</span>
                </v-alert>
                <Products :products="products"/>
                <Companies :companies="companies"/>
            </v-container>
        </v-flex>
    </v-content>
</template>

<script>
    import Products from '../components/Products.vue'
    import Companies from '../components/Companies.vue'

    export default {
        props: ['companies', 'products', 'hasAPIError', 'isLoading'],
        components: {
            Products,
            Companies
        }
    }
</script>