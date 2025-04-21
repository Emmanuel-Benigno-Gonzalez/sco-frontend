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

  // Guardar en localStorage cuando cambian las fechas
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      localStorage.setItem("fechaInicio", fechaInicio);
      localStorage.setItem("fechaFin", fechaFin);
    }
  }, [fechaInicio, fechaFin]);

  // Timer de inactividad: borra localStorage y reinicia fechas tras 20 min
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        localStorage.removeItem("fechaInicio");
        localStorage.removeItem("fechaFin");
        console.log("Fechas eliminadas por inactividad");

        const { defaultInicio, defaultFin } = getDefaultFechas();
        setFechaInicio(defaultInicio);
        setFechaFin(defaultFin);
      }, 20 * 60 * 1000); // 20 minutos
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // iniciar al montar

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  const { data, refetch } = useQuery({
    queryKey: ['ops', fechaInicio, fechaFin],
    queryFn: () => getOPS(fechaInicio, fechaFin),
  });

  const handleBuscar = () => {
    refetch(); // Refrescar manualmente
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
