<template>
  <div class="container-empty">
    <div
      v-if="loader"
      class="container-full"
    >
      <div class="container-spinner">
        <div
          class="spinner"
        />
      </div>
    </div>
    <header class="alcontrar-header">
      <router-link
        class="nav-link nav-link-title"
        to="/"
      >
        <h2 class="alcontrar-title">
          ALCONTRAR
        </h2>
      </router-link>
      <article class="grid-text">
        <p class="text">
          Busca los libros de tu lista <i>Wants To Read</i> en la biblioteca municipal de tu ciudad(Zaragoza o Madrid). Solamente tienes que introducir tu usuario de GoodReads.
        </p>
        <p class="text">
          <span class="user-info">¿Cúal es mi usuario de Goodreads?</span>
          Ve a tu perfil de GoodReads. En la dirección web saldrán una serie de números, eso es lo que necesitas.
        </p>
        <p class="text">
          <span class="user-info">¿No esta tu ciudad?</span> Si me mandas la web de tu biblioteca municipal puedo intentar incluirla. Escríbeme un correo a data[@]jorgeatgu.com o  a través de <a href="https://twitter.com/jorgeatgu">Twitter</a>.
        </p>
      </article>
      <article class="alcontrar-container-options">
        <label class="alcontrar-label-user">
          Número de usuario
        </label>
        <input
          class="alcontrar-input-user"
          placeholder="106928406"
          type="text"
          @input="getUser($event.target.value)"
        >
      </article>
      <article class="alcontrar-container-options">
        <label class="alcontrar-label-user">
          Ciudad
        </label>
        <v-select
          class="alcontrar-select"
          :options="cities"
          @input="selectCity"
        />
        <button
          :class="{ disabled: isDisabled }"
          :disabled="isDisabled"
          class="alcontrar-btn-load-list"
          @click="loadList"
        >
          CARGAR LISTA
        </button>
      </article>
    </header>
    <section
      v-if="items && !loader && userData"
      class="container"
    >
      <article class="container-btn-order">
        <p class="text">
          Hola <strong>{{ userData }}</strong>, aquí tienes los <strong>{{ items.length }}</strong> libros que quieres leer. Suerte en la búsqueda.
        </p>
        <button
          class="alcontrar-btn-reorder"
          @click="reorderAlphabetic()"
        >
          ORDEN ALFABETICO
        </button>
        <button
          class="alcontrar-btn-reorder"
          @click="reorderNumeric()"
        >
          ORDEN RATING
        </button>
      </article>
      <Book
        v-if="items"
        :items="items"
        :city-key="selected"
      />
    </section>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import axios from 'axios'
import { parseString } from 'xml2js'
import Book from './Book'
export default {
  name: 'List',
  components: {
    Book
  },
  data () {
    return {
      key: process.env.VUE_APP_KEY,
      secret: process.env.VUE_APP_SECRET,
      shelf: 'ALL',
      items: [],
      userGoodReads: '',
      selected: '',
      cities: ['Zaragoza', 'Madrid'],
      userData: '',
      selectEnable: false,
      loader: false
    }
  },
  computed: {
    isDisabled() {
      if (this.userGoodReads.length > 1 && this.selectEnable === true) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    getUser(newValue, oldValue) {
      if (newValue !== oldValue && oldValue !== undefined) {
        localStorage.removeItem('items').removeItem('userData');
        this.getData()
      }
    }
  },
  created() {
    if (this.items === undefined) {
      this.items = JSON.parse(localStorage.getItem('items') || "[]");
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }
  },
  methods: {
    getData() {
      this.loader = true
      const config = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }

      const url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${this.userGoodReads}.xml?key=${this.key}&v=2&v=2&shelf=ALL&page=1&per_page=200`

      axios
        .get(
            url,
            config
        )
        .then(response => {
          console.log(response.data)
          parseString(response.data, (err, result) => {
            if (err) {
              console.error(err)
            } else {
              this.items = result
              console.log("this.items", this.items);
              this.setItems()
            }
          })
        })
        .catch(e => {
          this.loader = false
          console.error(e.response)
        })
    },
    getDataUser() {
      const config = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }

      const userUrl = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/user/show/${this.userGoodReads}.xml?key=${this.key}`
      axios
        .get(
            userUrl,
            config
        )
        .then(response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error(err)
            } else {
              this.userData = result.GoodreadsResponse.user[0].name[0]
              localStorage.setItem('userData', JSON.stringify(this.userData))
              this.loader = false
            }
          })
        })
        .catch(e => {
          this.loader = false
          console.error(e.response)
        })
    },
    async loadList() {
      await this.getData()
      await this.getDataUser()
      this.userData = [this.userGoodReads, this.selected]
    },
    getUser(userId) {
      console.log("getUser -> userId", userId)
      this.userGoodReads = userId
    },
    selectCity(city) {
      this.selectEnable = true
      this.selected = city
    },
    sortAlphabetic(a, b) {
      const titleA = a.title[0].toUpperCase();
      const titleB = b.title[0].toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    },
    sortRating(a, b) {

      const titleA = a.average_rating[0].toUpperCase();
      const titleB = b.average_rating[0].toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = -1;
      } else if (titleA < titleB) {
        comparison = 1;
      }
      return comparison;
    },
    reorderAlphabetic() {
      this.items.sort(this.sortAlphabetic)
    },
    reorderNumeric() {
      this.items.sort(this.sortRating)
    },
    setItems() {
      localStorage.setItem('items', JSON.stringify(this.items))
    }
  }
}
</script>
