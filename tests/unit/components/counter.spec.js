import { shallowMount, mount } from '@vue/test-utils';
import Counter from '@/components/Counter'

describe('Counter component', () => {

  let wrapper
  // Con beforeEach puedes modificar el tiempo de vida de las variables dentro de ella
  // En este caso se ejecuta antes de cada una 
  beforeEach( () => {
    wrapper = shallowMount( Counter )
  }) 

  // test('debe de hacer match con el snapshot',() => {

  //   const wrapper = shallowMount( Counter );
  //   expect( wrapper.html( ) ).toMatchSnapshot();
    
  // })


  test('h2 debe de tener el valor por defecto "Counter"', () => {
    // const wrapper = shallowMount( Counter )

    // NOTA: Puede haber más de un expect dentro de un test
    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2Value = wrapper.find('h2').text()

    // console.log( h2.text() )

    expect( h2Value ).toBe('Counter!')
  })


  test('El valor por defecto debe de ser 100 en el p', () => {
    // const wrapper = shallowMount( Counter );
    // Si se desea usar el findAll
    // const pTags = wrapper.findAll('p');
    // expect( pTags[1].text() ).toBe('100');

    // Cuando necesitas probar partes con atributos únicamente para hacer testing
    const value = wrapper.find('[data-testid="counter"]').text()
    expect( value ).toBe('100');

  })



  // NOTA: Para los eventos del click, como demora los cambios por el uso del DOM virtual, necesita que pase un tiempo para que pueda actualizarse, sino los cambios no serán leídos
  test('Debe de incrementar y decrementar el contador', async () => {
    // const wrapper = shallowMount( Counter );
    
    const increaseBtn = wrapper.find('button');

    const decreaseBtn = wrapper.find('[data-testidxd="btn_disminuir"]');

    await increaseBtn.trigger('click');

    //NOTA: OJO, el value no es reactivo, debes de volver a ejecutarlo para obtener el valor actualizado
    let value = wrapper.find('[data-testid="counter"]').text();

    expect( value ).toBe('101');
    
    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    value = wrapper.find('[data-testid="counter"]').text();

    expect( value ).toBe('99');
    
  })


  test('incrementar y decrementar el contador REFACTORIZADO', async () => {

    // const wrapper = shallowMount( Counter )

    const [increaseBtn, decreaseBtn] = wrapper.findAll('button'); 
    
    for(let i=0; i<3; i++){
      // Aumenta el contador 3 veces
      await increaseBtn.trigger('click')
    }

    for(let i=0; i<2; i++){
      // Aumenta el contador 2 veces
      await decreaseBtn.trigger('click')
    }
 
    const value = wrapper.find('[data-testid="counter"]').text() 

    expect( value ).toBe('101');
  })


  test('Debe de establecer el valor por defecto', () => {
    console.log( wrapper.props())
    const {start } = wrapper.props(); // Con desestructuración
    const value = wrapper.props('start'); // Con el nombre del props
    const valor = wrapper.find('[data-testid="counter"]').text( )
    console.log( start, value)
    console.log(typeof start) // Se puede pedir el tipo de dato

    expect(valor).toBe( String(start) )
  })


  test('Debe de mostrar la prop title', () => {
    const mensajito = 'Hola mundo CRUEL pero hermozo';
    // Para enviar props 
    const wrapper = shallowMount( Counter, {
      props : {
        mensajito,
        //start : 5
      }
    } )

    console.log( wrapper.html())
    
    expect( wrapper.find('h2').text()).toBe(mensajito)
  })

  test('Asegurar el valor al cuadrado', async () => {
    const start = 4
    const wrapper = shallowMount( Counter, {
      props : {
        start
      }
    });

    console.log( wrapper.html())
    wrapper.setData( { start })
    // expect( await Counter.computed.computedElevado.call()).toContain(start*start)
    console.log( Counter.computed.computedElevado.call())
    // QUEDO INCOMPLETO

  })

})