<template>
  <h1>Indecision app</h1>
  <img :src="img" alt="bg" v-if="img">
  <div class="bg-dark"></div>

  <div class="indecision-container">

    <input type="text" placeholder="Hazme una pregunta" v-model="question" @keypress.enter="printQuestion">
    <p>Recuerda terminar con el signo (?)</p>

    <div>
      <h2 v-if="validarPregunta(question)"> {{question}} </h2>
      <h1 v-if="answer"> {{ traducirRespuesta }} </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question : "",
      answer : null,  
      img : null
    }
  },
  methods : {
    printQuestion(){
      console.log( this.question )
    },
    async getAnswer(){ 
      try {
        this.answer = 'Pensando...' 
        const {answer, image} = await fetch('https://yesno.wtf/api')
         .then( r => r.json())  
       this.img = image
        this.answer = answer 
        //console.log( data ) 
    } catch( err ){
        console.log( 'Indecision Component:', err )
        this.answer = 'No se pudo cargar del API'
        this.img = null
    }
    },
    validarPregunta( palabra ) {
      //return palabra.slice( palabra.length ) === '?'
      return palabra.includes('?')
    }
  },
  watch : {
    question( value, oldValue ){
      console.log({ value })
      if ( !value.includes('?')) return
      // TODO: Realizar petición
      
      this.getAnswer()
    }
  },
  computed : {
    traducirRespuesta () {
      if ( this.answer === 'yes') return 'Sí'
      else if ( this.answer === 'no' ) return 'Nope'
      else if ( this.answer === 'maybe' ) return 'Podría ser'
      else return null
    }
  }
}
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>