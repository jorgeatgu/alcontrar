<template>
  <div id="app">
    <keep-alive exclude="BookDetail">
      <router-view />
    </keep-alive>
    <footer class="footer">
      <div class="alcontrar-header">
        <p class="footer-texto">
          Hecho en Zaragoza con mucha maña por un
          <a class="footer-links" href="http://jorgeatgu.com" target="_blank">
            maño</a> - MMXX
        </p>
        <p class="footer-texto">
          Cualquier consulta escribid a: data@jorgeatgu.com
        </p>
        <a class="footer-links" href="https://github.com/jorgeatgu/alcontrar">
          Todo el código y datos está disponible en GitHub
        </a>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    let buyMeACoffee = document.createElement('script')
    buyMeACoffee.setAttribute('src', 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js')
    buyMeACoffee.setAttribute('data-name', 'BMC-Widget')
    buyMeACoffee.setAttribute('data-cfasync', 'false')
    buyMeACoffee.setAttribute('data-id', 'jorgeatgu')
    buyMeACoffee.setAttribute('data-descritption', 'Support me on Buy me a coffee!')
    buyMeACoffee.setAttribute('data-message', 'Puedes apoyar mis proyectos aquí. Gracias! :)')
    buyMeACoffee.setAttribute('data-color', '#79D6B5')
    buyMeACoffee.setAttribute('data-position', 'Right')
    buyMeACoffee.setAttribute('data-x_margin', '18')
    buyMeACoffee.setAttribute('data-y_margin', '18')
    document.body.appendChild(buyMeACoffee)
    buyMeACoffee.onload = function() {
      const evt = document.createEvent('Event');
      evt.initEvent('DOMContentLoaded', false, false);
      window.dispatchEvent(evt);
    }
  }
}

</script>
