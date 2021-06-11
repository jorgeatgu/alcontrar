<template>
  <div class="container-details">
    <header class="alcontrar-header">
      <h2
        class="alcontrar-title"
        @click="$router.replace('/')"
      >
        ALCONTRAR
      </h2>
    </header>
    <div
      v-if="booksItems"
      class="container"
    >
      <button
        class="alcontrar-btn-reorder"
        @click="$router.replace('/')"
      >
        VOLVER A TU LISTA
      </button>
      <div class="card-details">
        <div class="card-details-left">
          <img
            class="card-details-image"
            :src="booksItems.image_url[0]"
          >
          <div class="card-detials-left-text">
            <span class="card-details-average">Puntuación <strong>{{ booksItems.average_rating[0] }}</strong></span>
            <span
              v-if="booksItems.num_pages[0] !== ''"
              class="card-details-pag"
            >
              <strong>
                {{ booksItems.num_pages[0] }}
              </strong>
              páginas
            </span>
            <span
              v-if="booksItems.publication_year[0] !== ''"
              class="card-details-year"
            >
              Publicado en
              <strong>
                {{ booksItems.publication_year[0] }}
              </strong>
            </span>
          </div>
        </div>
        <div class="card-details-right">
          <h2
            v-if="booksItems.title[0] !== ''"
            class="card-details-title"
          >
            {{ booksItems.title[0] }}
          </h2>
          <span
            v-if="booksItems.authors[0].author[0].name[0] !== ''"
            class="card-details-autor"
          >
            {{ booksItems.authors[0].author[0].name[0] }}
          </span>
          <span
            v-if="booksItems.description[0] !== ''"
          >
            <p
              class="card-details-description"
              v-html="booksItems.description[0]"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookDetail',
  props: {
    books: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      searchCalamo: 'https://www.libreriacalamo.com/buscarlibros.php?Titulo=',
      searchBiblioteca: 'https://bibliotecas.aragon.es/cgi-bin/opac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99=',
      index: 0,
      booksItems: []
    }
  },
  created() {
    if (this.books === undefined) {
      this.booksItems = JSON.parse(localStorage.getItem('books') || "[]");
    } else {
      this.storeItems()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path !== "/") {
      localStorage.setItem('books', JSON.stringify(this.booksItems));
    } else {
      next()
    }
  },
  methods: {
    storeItems() {
      this.booksItems = this.books
      localStorage.setItem('books', JSON.stringify(this.booksItems));
    }
  }
}
</script>
