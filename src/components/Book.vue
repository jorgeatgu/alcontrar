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
          @click="navTo(item, index)"
        >{{ item.title[0] }}
        </span>
        <span class="card-average">Puntuación <strong>{{ item.average_rating[0] }}</strong></span>
        <div v-if="cityKey === 'Zaragoza'">
          <a
            class="card-btn card-btn-calamo"
            :href="searchCalamo + ignoreAccent(item.title[0])"
          >
            Calamo
          </a>
          <a
            class="card-btn card-btn-biblioteca"
            @click="searchBiblioteca(item.title[0])"
          >
            Biblioteca
          </a>
        </div>
        <div v-else-if="cityKey === 'Madrid'">
          <a
            class="card-btn card-btn-biblioteca"
            @click="searchBiblioteca(item.title[0])"
          >
            Biblioteca
          </a>
        </div>
        <div v-else>
          <p>Nope!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    items: {
      type: Array,
      required: true
    },
    cityKey: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      searchCalamo: 'https://www.libreriacalamo.com/buscarlibros.php?Titulo=',
      stringSearch: ''
    }
  },
  methods: {
    searchBiblioteca(title) {
      title = title.replace('ñ','%F1')
      title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      title = title.replace(' ','+')
      if (this.cityKey === "Zaragoza") {
        window.open(
          `https://bibliotecas.aragon.es/cgi-bin/opac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99=${title}`,
          '_blank'
        )
      } else if (this.cityKey === "Madrid") {
        window.open(
          `https://gestiona3.madrid.org/biblio_publicas/cgi-bin/abnetopac/?ACC=DOSEARCH&xsqf02=${title}`,
          '_blank'
        )
      }
    },
    ignoreAccent(elem) {
      elem = elem.replace('ñ','-&-')
      elem = elem.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      elem = elem.replace('-&-','ñ')
      return elem
    },
    navTo(item, index) {
      this.$router.push({ name: "element", params: { id: item.title[0], books: this.items[index] } })
    }
  }
}
</script>
