<template>
  <div class="card-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="card"
    >
      <img
        class="card-image"
        :src="item.image_url[0]"
      >
      <div class="card-group">
        <span
          class="card-title"
          @click="navTo(item)"
        >{{ item.title[0] }}
        </span>
        <span class="card-average">Puntuación <strong>{{ item.average_rating[0] }}</strong></span>
        <!-- <span class="card-autor">{{ item.authors[0].author[0].name[0] }}</span>
        <span class="card-pages"><strong>{{ item.num_pages[0] }}</strong> páginas</span>
        <span class="card-year">Publicado en <strong>{{ item.publication_year[0] }}</strong></span>
        <span class="card-average">Puntuación <strong>{{ item.average_rating[0] }}</strong></span>
        <p
          v-html="item.description[0]"
        /> -->
        <div v-if="cityKey === 'Zaragoza'">
          <a
            class="card-btn card-btn-calamo"
            :href="searchCalamo + ignoreAccent(item.title[0])"
          >
            Calamo
          </a>
          <a
            class="card-btn card-btn-biblioteca"
            :href="searchBiblioteca + ignoreAccent(item.title[0])"
          >
            Biblioteca
          </a>
        </div>
        <div v-else-if="cityKey === 'Madrid'">
          <a
            class="card-btn card-btn-biblioteca"
            :href="searchBiblioteca + ignoreAccent(item.title[0])"
          >
            Biblioteca
          </a>
        </div>
        <div v-else>
          <p>Aquí no hay playa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  filters: {
    replace: function(text) {
      return text.replace(/%20/g, ' ').replace(/%/g, ' ');
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    cityKey: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      searchCalamo: 'https://www.libreriacalamo.com/buscarlibros.php?Titulo=',
      searchBiblioteca: 'https://bibliotecas.aragon.es/cgi-bin/opac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99='
    }
  },
  mounted() {
    console.log(this.cityKey)
  },
  methods: {
    ignoreAccent(elem) {
      elem = elem.replace('ñ','-&-')
      elem = elem.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      elem = elem.replace('-&-','ñ')
      return elem
    },
    navTo(item) {
      this.$router.push({ name: "element", params: { id: item.title[0], books: this.items[0] } });
    }
  }
}
</script>
