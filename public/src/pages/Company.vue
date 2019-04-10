<template>
    <v-content v-if="company">
        <v-layout grey lighten-2>
            <v-flex xs12 offset-sm1 sm10 offset-md2 md8>
                <v-container grid-list-lg>
                    <v-flex xs12 mb-4>
                        <h1 class="display-3">{{company.name}}</h1>
                        <div class="subheading my-3">{{company.description}}</div>
                        <v-btn class="mx-0" color="primary" large :to="{ name: 'contact'}">
                            {{company.name}} kontaktieren
                        </v-btn>
                    </v-flex>
                </v-container>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    export default {
        data () {
            return {
                company: null
            }
        },
        mounted () {
            this.$http
            .get('/companies/' + this.$route.params.id)
            .then(response => (this.company = response.data))
        },
    }
</script>