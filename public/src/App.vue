<template>
    <v-app>
        <Navigation :products="products" :companies="companies"></Navigation>

        <router-view :products="products" :companies="companies" :hasAPIError="hasAPIError" :isLoading="isLoading"
                     :key="$route.fullPath"></router-view>
    </v-app>
</template>

<script>
    import Navigation from './components/Navigation.vue'

    export default {
        name: 'app',
        data() {
            return {
                products: null,
                companies: null,
                hasAPIError: false,
                isLoading: true,
            }
        },
        mounted() {
            this.$http.all([
                this.$http.get('/products'),
                this.$http.get('/companies')
            ])
                .then(this.$http.spread(function (products, companies) {
                    this.products = products.data;
                    this.companies = companies.data;
                }.bind(this)))
                .catch(() => this.hasAPIError = true)
                .then(() => this.isLoading = false)
        },
        components: {
            Navigation
        }
    }
</script>

