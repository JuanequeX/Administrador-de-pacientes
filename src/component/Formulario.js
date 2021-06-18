import React, {useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  //Create dates states
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

  //Segundo state
  const [ error, actualizarError ] = useState(false);

  //Funcion que se ejecuta cada que el usuario escribe en un input
  const actualizarState  = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  //Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presionar agregar cita
  const submitCita = e => {
    e.preventDefault();

    //Validar!!!
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      actualizarError(true);
      return;
    }
    //Eliminar mensaje de errror
    actualizarError(false);

    //Asignar un ID!!
    cita.id = uuid();
    //Crear la cita!!
    crearCita(cita);
    //Reiniciar el form!!
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  };
  return (
    <>
      <h2>Crear cita</h2>

      {error
        ? <p className = "alerta-error">Todos los campos son obligatorios</p>
        : null}
      <form
        onSubmit = {submitCita}
      >
        <label>Nombre de mascota</label>
        <input
          type = "text"
          name = "mascota"
          className = "u-full-width"
          placeholder = "Nombre mascota"
          onChange = {actualizarState}
          value = {mascota}
        />

        <label>Nombre dueño</label>
        <input
          type = "text"
          name = "propietario"
          className = "u-full-width"
          placeholder = "Nombre del dueño de la mascota"
          onChange = {actualizarState}
          value = {propietario}
        />

        <label>Fecha</label>
        <input
          type = "date"
          name = "fecha"
          className = "u-full-width"
          onChange = {actualizarState}
          value = {fecha}
        />

        <label>Hora</label>
        <input
          type = "time"
          name = "hora"
          className = "u-full-width"
          onChange = {actualizarState}
          value = {hora}
        />

        <label>Sintomas</label>
        <textarea
          className = "u-full-width"
          name = "sintomas"
          onChange = {actualizarState}
          value = {sintomas}
        ></textarea>

        <button
          type = "submit"
          className = "u-full-width button-primary"
          onChange = {actualizarState}
        >Agregar cita</button>
      </form>
    </>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
