<template>
  <h1>Indecision app</h1>
  <img src="" alt="bg">
  <div class="bg-dark"></div>

  <div class="indecision-container">

    <input type="text" placeholder="Hazme una pregunta" v-model="question" @keypress.enter="printQuestion">
    <p>Recuerda terminar con el signo (?)</p>

    <div>
      <h2> {{question}} </h2>
      <h1> {{answer}} </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question : null,
      answer : null,  
    }
  },
  methods : {
    printQuestion(){
      console.log( this.question )
    },
    async getAnswer(){
      let imagenFondo = document.querySelector('img')
      this.answer = 'Pensando...'
      console.log( imagenFondo)
      const {answer, image} = await fetch('https://yesno.wtf/api')
        .then( r => r.json()) 
      imagenFondo.src = image
      this.answer = answer
      //console.log( data )
      return answer
    }
  },
  watch : {
    question( value, oldValue ){
      //console.log({ value, oldValue })
      if ( !value.includes('?')) return
      // TODO: Realizar petición
      console.log( value )
      this.getAnswer()
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