<template>
    <div>
        <h1>Firmen</h1>

        <v-layout row wrap>
            <v-flex xs12 sm6 md4 mb-4 v-for="company in companies" :key="company.id">
                <v-card height="100%">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="180" xmlns="http://www.w3.org/2000/svg">
                        <title>{{company.name}}</title>
                        <rect fill="#868e96" width="100%" height="100%"></rect>
                        <text fill="#dee2e6" x="10%" y="50%">{{company.name}}</text>
                    </svg>
                    <v-card-title primary-title>
                        <h3 class="headline mb-0">
                            {{company.name}}
                        </h3>
                        <div>
                            {{company.description}}
                        </div>
                    </v-card-title>
                    <v-card-actions class="pl-3 pb-3">
                        <v-btn flat :to="{ name: 'company', params: { id: company.id}}">Zur Firma {{company.name}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        props: ['companies'],
    }
</script>