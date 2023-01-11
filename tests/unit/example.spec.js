

describe('Ejemplo de Component', () => {
  test('Debe de ser mayor a 10', () => {

    // ARREGLAR
    let value = 9;

    // ESTÍMULO
    value += 2;

    // OBSERVAR EL RESULTADO
    
    // Versión a mano (nunca lo verás así)
    /*
    if ( value > 10 ) {
      // TODO: Todo bien
    } else {
      throw `${value} no es mayor a 10`
    }
    */
   // Versión con el framework jest
   expect(value).toBeGreaterThan(10)


   })
})