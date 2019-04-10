<template>
    <v-content v-if="products">
        <v-flex xs12 offset-sm1 sm10 offset-md2 md8>
            <v-container grid-list-lg>
                <v-alert v-show="showSuccess" type="success">
                    <h4 class="alert-heading">Vue Lumen Tutorial Kontaktformular</h4>
                    <span class="mb-0">Ihre Kontaktanfrage wurde erfolgreich gesendet.</span>
                </v-alert>
                <v-alert v-show="showError" type="error">
                    <h4 class="alert-heading">Vue Lumen Tutorial Kontaktformular</h4>
                    <span>Ihre Kontaktanfrage konnte nicht gesendet werden.</span>
                    <v-divider class="my-3"></v-divider>
                    <span class="mb-0">Bitte versuchen Sie es noch einmal.</span>
                </v-alert>
                <v-form v-show="!showSuccess" @submit.prevent="onSubmit" ref="form" v-model="valid">
                    <v-card height="100%">
                        <v-card-title primary-title class="pb-0">
                            <div>
                                <h1 v-show="!showSuccess">Kontakt</h1>
                            </div>
                        </v-card-title>
                        <v-card-text class="pt-0">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-select label="Produkt" id="product" v-model="contact.product" :items="products"
                                              item-text="name" item-value="name"></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field validate-on-blur label="E-Mail-Adresse" required :rules="emailRules"
                                                  type="email" v-model="contact.email"
                                                  placeholder="Bitte Ihre E-Mail-Adresse eingeben"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea validate-on-blur label="Nachricht" name="message" required
                                                :rules="[(v) => !!v || 'Bitte hinterlassen Sie eine Nachricht']"
                                                v-model="contact.message"
                                                hint="Bitte Nachricht hinterlassen"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions class="pb-3 pl-3 pt-0">
                            <v-btn :loading="isSending" color="primary" type="submit" mb-2>Abschicken</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-container>
        </v-flex>
    </v-content>
</template>

<script>
    export default {
        props: ['products'],
        data() {
            return {
                valid: false,
                contact: {
                    product: this.$route.query.product ? this.$route.query.product : '',
                    email: '',
                    message: '',
                },
                isSending: false,
                showSuccess: false,
                showError: false,
                emailRules: [
                    (v) => !!v || 'Bitte geben Sie Ihre E-Mail-Adresse ein',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
                ],
            }
        },
        methods: {
            onSubmit() {
                if (this.$refs.form.validate()) {
                    this.valid = true
                    this.isSending = true;
                    this.showError = false;

                    setTimeout(() => {
                        // Build for data
                        let form = new FormData();
                        for (let field in this.contact) {
                            form.append(field, this.contact[field]);
                        }
                        this.$http
                            .post('/contact', form)
                            .then((response) => {
                                this.isSending = false
                                this.showSuccess = true
                            })
                            .catch(() => {
                                this.isSending = false
                                this.showError = true
                            })
                    }, 1000);
                }
            }
        },
    }
</script>