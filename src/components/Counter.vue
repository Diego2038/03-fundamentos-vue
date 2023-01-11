<template>
  <!-- <h2>{{mensajito || 'Titulo por defecto'}}</h2> Es lo mismo que abajo -->
  <h2>{{customTitle}}</h2>
  <p> {{ counter }}<sup>2</sup> = {{ computedElevado}}</p> <!-- OJO: con computed sólo puedes invocarlos sin parámetros de entrada--> 
  <p data-testid="counter">{{ counter }}</p>
  <div class="mb-1">
    <button @click="aumentarCounter">Aumentar</button>
    <button data-testidxd="btn_disminuir"   @click="disminuirCounter">Disminuir</button>
  </div> 
</template>

<script>
export default {
  name : 'Patito',
  //props : ['mensajito', 'start'], // 1ra forma de poner props (son como las etiquetas que podrías poner)
  props : {
    mensajito : String,
    //start : Number
    start : {
      type : Number,
      default : 100, // El valor por defecto en caso de que no esté determinado
      //required : true // Para obligar a que se use esa etiqueta en el template
      validator ( value ) {
        return value >= 100
      }
    }
  },
  data() { // Para que de esta manera se puedan crear datos de forma reactiva
    return {
      counter : this.start
    }
  },
  methods : {
    elevado() {
      console.log('elevado')
      return this.counter * this.counter
    },
    aumentarCounter(){
      this.counter += 1
    },
    disminuirCounter(){
      this.counter -= 1
    } 
  },
  computed : { // OJO las propiedades computadas son mejores que los métodos, porque la operación se almacena en el caché
    computedElevado() {
      //console.log('elevado computed')
      return this.counter * this.counter
    },
    customTitle() {
      // if( !this.mensajito) return 'Counter'
      // else return this.mensajito
      return this.mensajito || 'Counter!'
    }
  }
  
}
</script>

<style>

button {
  background-color: #64B687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}

</style>