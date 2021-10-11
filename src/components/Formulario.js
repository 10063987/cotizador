import React, { useState } from 'react';
import styled from '@emotion/styled'
import { obtenerDiferenciaYear } from '../helper';
import { calcularMarca } from '../helper';
import { obtenerPlan } from '../helper';
import PropTypes from 'prop-types'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`

const Label = styled.label`
    flex: 0 0 100px;
`

const Select = styled.select`
    display: block;
    width: 90%;
    padding: .6rem;
    border: 1px solid #1e1e1e;
    text-align: center;
    -webkit-appearance: none;
`

const InputRadio = styled.input`
    margin: 0 1rem;
`

const Boton = styled.button`
    background: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    margin-top: 2rem;
    transition: all .4s ease;

    &:hover{
        cursor: pointer;
        background: #26C6DA;
    }
`

const Error = styled.div`
    background: red;
    color: #fff;
    padding: 1rem;
    width: 90%;
    text-align: center;
    margin: 0rem auto 2rem;
`

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState(false)

    const { marca, year, plan } = datos 

    const obtenerInformacion = (e) => {
        setDatos({ ...datos, [e.target.name] : e.target.value})
    }


    // cotizarSeguro
    const handleSubmit = (e) => {
        e.preventDefault()

        if( marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
            setError(true)
            return
        }
        setError(false)

        let resultado = 2000
        const porcentaje = 3
        const diferencia = obtenerDiferenciaYear(year)

        resultado -= ((porcentaje * diferencia) * resultado) / 100

        resultado = calcularMarca(marca) * resultado

        const incrementoPlan = obtenerPlan(plan)
        resultado = parseFloat( incrementoPlan * resultado).toFixed(2)

        guardarCargando(true)
        setTimeout( () => {
            guardarCargando(false)
            // Total 
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        }, 2500)

    }


    return ( 
        <form
            // cotizarSeguro
            onSubmit={handleSubmit}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value=""> -- Selecciona --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Selecciona --</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

             <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="básico"
                    checked={plan === "básico"}
                    onChange={obtenerInformacion}
                /> Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={ plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}
 

Formulario.protoTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;