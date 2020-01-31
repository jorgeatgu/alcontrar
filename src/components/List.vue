<template>
  <div>
    <header class="alcontrar-header">
      <router-link
        class="nav-link nav-link-title"
        to="/"
      >
        <h2 class="alcontrar-title">
          alcontrar
        </h2>

        <div class="alcontrar-container-options">
          <label class="alcontrar-label-user">
            Número de usuario
          </label>
          <input
            class="alcontrar-input-user"
            placeholder="23142423"
            type="text"
            @input="getUser($event.target.value)"
          >
        </div>
        <div class="alcontrar-container-options">
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
        </div>
      </router-link>
    </header>
    <div
      v-if="loader"
      class="container-spinner"
    >
      <p>Cargando tu lista...</p>
      <div
        class="spinner"
      />
    </div>
    <div
      v-if="items && userData && !loader"
      class="container"
    >
      <div class="container-btn-order">
        <p>Hola {{ userData }}, aquí tienes tu lista de libros que quieres leer.</p>
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
      </div>
      <Book
        v-if="items && userData"
        :items="items"
        :city-key="selected"
      />
    </div>
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
      title: process.env.VUE_APP_TITLE,
      secret: process.env.VUE_APP_SECRET,
      user_id: process.env.VUE_APP_USER_ID,
      version: process.env.VUE_APP_VERSION,
      shelf: process.env.VUE_APP_SHELF,
      url: '',
      items: null,
      userGoodReads: '',
      selected: '',
      cities: ['Zaragoza', 'Madrid'],
      userData: '',
      selectEnable: false,
      loader: false,
      userUrl: ''
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
  methods: {
    getData() {
      this.loader = true
      const config = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }

      this.url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${this.userGoodReads}.xml?key=${this.key}&v${this.v}&shelf=${this.shelf}&page=1&per_page=200`
      this.userUrl = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/user/show/${this.userGoodReads}.xml?key=${this.key}`
      axios
        .get(
            this.url,
            config
        )
        .then(response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error(err)
            } else {
              this.loader = false
              this.items = result.GoodreadsResponse.books[0].book
            }
          })
        })
        .catch(e => {
          this.loader = false
          console.error(e.response)
        })

        axios
        .get(
            this.userUrl,
            config
        )
        .then(response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error(err)
            } else {
              this.loader = false
              this.userData = result.GoodreadsResponse.user[0].name[0]
            }
          })
        })
        .catch(e => {
          this.loader = false
          console.error(e.response)
        })
    },
    loadList() {
      this.userData = [this.userGoodReads, this.selected]
      this.getData()
    },
    getUser(userId) {
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
    }
  }
}
</script>
