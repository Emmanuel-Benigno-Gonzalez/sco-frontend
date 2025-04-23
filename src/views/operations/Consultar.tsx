import TableOps from '../../components/TableOps';
import { useQuery } from "@tanstack/react-query";
import { getOPS } from "../../api/OpsAPI";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      localStorage.setItem("fechaInicio", fechaInicio);
      localStorage.setItem("fechaFin", fechaFin);
    }
  }, [fechaInicio, fechaFin]);

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

    resetTimer();

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
    refetch();
  };

  return (
    <>
      <h1>Consultar de Operaciones</h1>

      <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
        <TextField
          id="fecha-inicio"
          label="Inicio"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '2rem',
            },
            '& .MuiInputLabel-root': {
              fontSize: '2rem',
            },
          }}
        />

        <TextField
          id="fecha-fin"
          label="Fin"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '2rem',
            },
            '& .MuiInputLabel-root': {
              fontSize: '2rem',
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleBuscar}
          sx={{
            backgroundColor: '#0CB7F2', 
            fontSize: '1.5rem',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#00B4D8',
            },
          }}
        >
          Buscar
        </Button>
      </Box>

      <TableOps data={data || []} />
    </>
  );
}
