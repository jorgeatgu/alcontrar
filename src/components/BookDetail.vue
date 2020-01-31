<template>
  <div>
    <header class="alcontrar-header">
      <router-link
        class="nav-link nav-link-title"
        to="/"
      >
        <h2 class="alcontrar-title">
          ADUBIR
        </h2>
      </router-link>
    </header>
    <div class="card-container">
      <span class="card-average">Puntuación <strong>{{ books.average_rating[0] }}</strong></span>
      <span class="card-autor">{{ books.authors[0].author[0].name[0] }}</span>
      <span class="card-pages"><strong>{{ books.num_pages[0] }}</strong> páginas</span>
      <span class="card-year">Publicado en <strong>{{ books.publication_year[0] }}</strong></span>
      <span class="card-average">Puntuación <strong>{{ books.average_rating[0] }}</strong></span>
      <p
        v-html="books.description[0]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookDetail',
  filters: {
    replace: function(text) {
      return text.replace(/%20/g, ' ').replace(/%/g, ' ');
    }
  },
  props: {
    books: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      searchCalamo: 'https://www.libreriacalamo.com/buscarlibros.php?Titulo=',
      searchBiblioteca: 'https://bibliotecas.aragon.es/cgi-bin/opac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99='
    }
  }
}
</script>
