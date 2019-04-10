<template>
    <v-content v-if="product">
        <v-layout grey lighten-2>
            <v-flex xs12 offset-sm1 sm10 offset-md2 md8>
                <v-container grid-list-lg>
                    <v-flex sm12 mb-4>
                        <h1 class="display-3">{{product.name}}</h1>
                        <div class="subheading my-3">{{product.description}}</div>
                        <v-btn class="mx-0" color="primary" large :to="{ name: 'contact', query: { product: product.name}}">
                            "{{product.name}}" anfragen
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
              product: null,
          }
      },
      mounted () {
          this.$http
          .get('/products/' + this.$route.params.id)
          .then(response => (this.product = response.data))
      }
  }
</script>