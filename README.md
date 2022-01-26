# multi-site-simulators

A widget to simulate shares at multi.

That's a widget you can include in any html page...

---

# How to integrate widgets

Widgets need two files in order to work : 

- `app.js`
- `app.css`

Add those two files to your html head.

Widgets can now be called directly into the page as custom html elements.

---

# Widget config

The widget's tag is : `<multi-shares-simulator/>`

The widget takes several parameters, following this structure :

```
  locale="fr"
  partvalue="25"
  minbenefs="0"
  benefs="100000"
  repart='{
    "reserves":0.4,
    "participation":0.5,
    "dividendes":0.1
  }'
  team='[
    { "name":"Johan Richer", "parts":100, "workTime":100 }, 
    { "name":"Julien Paris", "parts":100, "workTime":100 }, 
    { "name":"Thomas Brosset", "parts":40, "workTime":40 }, 
    { "name":"Pierre Camilleri", "parts":100, "workTime":60 }, 
    { "name":"Quentin Loridant", "parts": 100, "workTime":80 }
  ]'
```

---

# Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

# Stack


Technologies used for **multi-site-simulator** are the followiing :

- [Vue.js](https://vuejs.org/) - js framework ;
- [Buefy](https://buefy.org/documentation) - vue css framework based on [Bulma](https://bulma.io/) css framework ;
- [vue-custom-element](https://github.com/karol-f/vue-custom-element) - custom web component wrapper for vue.js ;

---

# Resources

- https://itnext.io/vuidget-how-to-create-an-embeddable-vue-js-widget-with-vue-custom-element-674bdcb96b97
- [GitHub - karol-f/vue-custom-element: Vue Custom Element - Web Components&#39; Custom Elements for Vue.js](https://github.com/karol-f/vue-custom-element)
- https://innovation.enova.com/building-an-embeddable-micro-frontend-with-vue-js/

---

### Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/42fb20bd-145d-4c2c-a2f6-a5d299c85071/deploy-status)](https://app.netlify.com/sites/multi-site-simulator-test/deploys)
