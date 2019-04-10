<template>
    <v-layout row wrap>
        <v-content v-if="contacts">
            <v-flex xs12 offset-sm1 sm10 offset-md2 md8>
                <v-container id="framework-grid" class="page">
                    <h1 class="pb-4">Kontaktanfragen</h1>

                    <v-data-table :headers="headers" :items="contacts" class="elevation-1">
                        <template slot="items" slot-scope="contact">
                            <td>{{ contact.item.id }}</td>
                            <td class="text-xs">{{ contact.item.product }}</td>
                            <td class="text-xs">{{ contact.item.email }}</td>
                            <td class="text-xs">{{ contact.item.message }}</td>
                            <td class="text-xs">{{ contact.item.created_at }}</td>
                        </template>
                    </v-data-table>
                </v-container>
            </v-flex>
        </v-content>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    {text: '#', value: 'id'},
                    {text: 'Produkt', value: 'product'},
                    {text: 'E-Mail', value: 'email'},
                    {text: 'Nachricht', value: 'message'},
                    {text: 'Datum', value: 'created_at'},
                ],
                contacts: null,
            }
        },
        mounted() {
            this.$http
                .post('/private/contacts')
                .then(response => (this.contacts = response.data))
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        this.$store.dispatch('logout')
                            .then(() => {
                                this.$router.push('/login')
                            })
                    }
                })
        },
    }
</script>