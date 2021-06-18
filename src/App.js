import React, {useState, useEffect} from 'react';
import Formulario from './component/Formulario';
import Cita from './component/Cita';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  //citas en llocal storage]
  if(!citasIniciales) {
    citasIniciales = [];
  }
  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar acciones cuendo el state cambie
  useEffect( () => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas]);

  //Funcion que toma las citas actuales y agrega la nueva
  const crearCita = cita => { guardarCitas([...citas, cita]); }

  //Funcion que elimina una cita por su id
  const eliminarCita = id => {
   const nuevasCitas = citas.filter(cita => cita.id !== id)
  guardarCitas(nuevasCitas);
  }

  //Mensaje de Citas
  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas';

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
                <Formulario
                  crearCita = {crearCita}
                />
          </div>
          <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita =>(
                  <Cita
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
