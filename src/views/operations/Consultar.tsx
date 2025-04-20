import TableOps from '../../components/TableOps';
import { useQuery } from "@tanstack/react-query";
import { getOPS } from "../../api/OpsAPI";
import { useEffect, useState } from "react";

function getDefaultFechas() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const inicio = new Date(year, month, 1);
  const fin = new Date(year, month + 1, 0);

  const toISO = (date: Date) => date.toISOString().split('T')[0];

  return {
    defaultInicio: toISO(inicio),
    defaultFin: toISO(fin),
  };
}

export default function Consultar() {
  const { defaultInicio, defaultFin } = getDefaultFechas();

  const [fechaInicio, setFechaInicio] = useState(
    localStorage.getItem("fechaInicio") || defaultInicio
  );
  const [fechaFin, setFechaFin] = useState(
    localStorage.getItem("fechaFin") || defaultFin
  );

  // 🔄 Guardar automáticamente el rango en localStorage cuando cambien
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      localStorage.setItem("fechaInicio", fechaInicio);
      localStorage.setItem("fechaFin", fechaFin);
    }
  }, [fechaInicio, fechaFin]);

  // 🔍 Consulta react-query que se actualiza automáticamente con cambios en las fechas
  const { data, refetch } = useQuery({
    queryKey: ['ops', fechaInicio, fechaFin],
    queryFn: () => getOPS(fechaInicio, fechaFin),
  });

  const handleBuscar = () => {
    refetch(); // Opcional si quieres dar control manual
  };

  return (
    <>
      <h1>Consultar de Operaciones</h1>

      <div>
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>

        <label>
          Fecha Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>

        <button onClick={handleBuscar}>Buscar</button>
      </div>

      <TableOps data={data || []} />
    </>
  );
}
