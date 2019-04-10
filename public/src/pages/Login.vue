<template>
    <v-container grid-list-lg>
        <v-form @submit.prevent="login" ref="form" v-model="valid">
            <v-layout row>
                <v-flex xs12 offset-sm2 sm8 offset-md4 md4>
                    <v-card height="100%">
                        <v-card-title primary-title class="pb-0">
                            <div>
                                <h1 class="headline mb-0">Login</h1>
                            </div>
                        </v-card-title>
                        <v-card-text class="pt-0">
                            <v-text-field validate-on-blur label="E-Mail-Adresse" required :rules="emailRules"
                                          type="email" v-model="email"></v-text-field>
                            <v-text-field validate-on-blur label="Passwort" required
                                          :rules="[(v) => !!v || 'Bitte Ihr Passwort eingeben']" type="password"
                                          v-model="password"></v-text-field>
                        </v-card-text>
                        <v-card-actions class="pb-3 pl-3 pt-0">
                            <v-btn :loading="isSending" color="primary" type="submit" mb-2>Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,
                email: "",
                password: "",
                isSending: false,
                emailRules: [
                    (v) => !!v || 'Bitte geben Sie Ihre E-Mail-Adresse an',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Bitte geben Sie eine gültige E-Mail-Adresse an'
                ],
            }
        },
        methods: {
            login: function () {
                if (this.$refs.form.validate()) {
                    this.valid = true
                    this.isSending = true;

                    let username = this.email;
                    let password = this.password;
                    this.$store.dispatch('login', {username, password})
                        .then(() => {
                            this.isSending = false;
                            this.$router.push('/admin')
                        })
                        .catch(() => this.isSending = false)
                }
            }
        }
    }
</script>