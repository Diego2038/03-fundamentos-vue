import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision"


describe("Prueba componentes Indecision Vue", () => {

  let wrapper;
  let clgSpy;

  // Para crear una nueva función en el objeto global. Con esto se "simula" que se tiene fetch, ya que jest se ejecuta con Node, y Node no tiene implementado fetch (sólo los navegadores lo tienen)
  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      // Aquí simulas la devolución del API
      answer : 'yes',
      forced: false,
      image: "https://yesno.wtf/assets/yes/2.gif"
    })
  })) 

  beforeEach( () => {
    wrapper = shallowMount( Indecision )
    clgSpy = jest.spyOn( console, 'log' ) // Es un espía que está pendiente de la función console (no puede ser algo diferente a una función  ), y la función log

    jest.clearAllMocks() // Para limpiar todos los mocks en cada prueba
  })

  test('Hacer match con el snapshot', () => {
    // console.log( wrapper.html() )
    expect( wrapper.html() ).toMatchSnapshot(); // Con esto toda la estructura del HTML queda igual, al menos que ejecutes -r para actualizar

  })

  // Y no debe de ejecutar la función getAnswer
  test('escribir en el input no debe de disparar nada (console.log)', async () => {

    //console.log( wrapper.vm ) // OJO, con vm puedes. vm es la instancia de Vue propiamente
    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer')

    const input = wrapper.find('input')
    await input.setValue('Hola mundo')
    expect( clgSpy ).toHaveBeenCalled() // ser llamado
    // expect( clgSpy ).toHaveBeenCalledTimes(2) // Ser llamado x cantidad de veces

    expect( getAnswerSpy ).not.toHaveBeenCalled()
  })

  test('escribir el símbolo de "?" debe de disparar el getAnswer', async () => {

    const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer')

    const input = wrapper.find('input')
    await input.setValue('pregunta x?')

    expect( clgSpy ).toHaveBeenCalled()
    expect( getAnswerSpy ).toHaveBeenCalledTimes(1)
  })

  test('pruebas en getAnswer', async () => {
    await wrapper.vm.getAnswer() // Nota que el mock ya hace el llamado por defecto.
    // Así no se agota la cuota del llamado de la API (en caso de ser necesario)

    // console.log( wrapper.vm.img )
    // console.log( wrapper.vm.answer )

    const img = wrapper.find('img')

    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe("https://yesno.wtf/assets/yes/2.gif")
    expect( wrapper.vm.answer ).toBe('yes')
  })

  test('pruebas en getAnswer - Fallo en la API', async () => {

    fetch.mockImplementationOnce( () => Promise.reject('Api is down'))
    await wrapper.vm.getAnswer()  
    

    const img = wrapper.find('img')
    expect( img.exists() ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')
  })

})