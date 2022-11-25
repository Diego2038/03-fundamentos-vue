<template>
  <Indecision />
  <!-- <img alt="Vue logo" src="./assets/logo.png">  -->
  <!-- <Counter mensajito="Saludos invocador" :start="103"  />  -->
  <!--  <Counter mensajito="Saludos invocador"\></Counter>  Es equivalente, además se pone el : por el v-bind, de esta forma el parámetro pasa como expresión de JS--> 
  <!-- <HelloWorld pepe="xdd"></HelloWorld> -->
</template>

<script> 
import Counter from './components/Counter.vue';
import Indecision from './components/Indecision.vue';
// import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App', 
  components : {
    Indecision,
    Counter,
    // HelloWorld
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
