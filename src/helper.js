
// obtener diferencia de años entre el carro y el año actual
// por cada año hay que restar el 3%
export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year
}


// Dependiendo del pais de origen el costo se eleva 
// Americano 15%
// Asiatico 5%
// Europeo 30%
export function calcularMarca(marca){
    let incremento

    switch(marca){
        case 'europeo':
            incremento = 1.30
            break

        case 'americano':
            incremento = 1.15
            break

        case 'asiatico':
            incremento = 1.05
            break

        default:
            break
    }

    return incremento
}


// Dependiendo del tipo de plan aumenta el precio del seguro 
// Basico 20%
// Completo 50%
export function obtenerPlan(plan){
    return ( plan === 'basico' ? 1.20 : 1.50 )
}


export function primerMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}