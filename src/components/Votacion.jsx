import React, { useEffect, useState } from "react";

const Votacion = (props) => {
  const [votos, setVotos] = useState([]);
  const contratoVotos = props.contract;

  // METODO PARA LISTAR VOTOS
  const ListarVotos = async () => {
    console.log("contract==>", props.contract);
    if (contratoVotos) {
      try {
        const contadorVotos = await contratoVotos.methods.contador().call();

        let arrayVotos = [];

        for (let i = 1; i <= contadorVotos; i++) {
          const infoVoto = await contratoVotos.methods.candidatos(i).call();
          console.log(infoVoto);

          if (infoVoto.nombre !== "") { // Check if the name is not empty
            const nuevoVoto = {
              id: infoVoto.id,
              nombre: infoVoto.nombre,
              conteoVotos: infoVoto.conteoVotos,
            };

            arrayVotos.push(nuevoVoto);
          }
        }

        setVotos(arrayVotos);
      } catch (error) {
        console.log("Error al actualizar el valor", error);
      }
    }
  };

  useEffect(() => {
    ListarVotos();
  }, [contratoVotos]);

  // FIN MÉTODO LISTAR VOTOS

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Votación</h1>
      <div className="space-y-2">
        {votos.map((opcion) => (
          <div key={opcion.id}> {/* Add a unique key for each mapped element */}
            <span className="px-4 py-2 border border-black">{opcion.id}</span>
            <span className="py-2 border border-black">{opcion.nombre}</span>
            <span className="py-2 border border-black">
              {opcion.conteoVotos}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Votacion;
