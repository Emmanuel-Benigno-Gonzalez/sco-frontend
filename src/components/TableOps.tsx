import { Box, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { consultarOpsSchema } from '../types/index';
import { useMemo } from 'react';

type OpsData = typeof consultarOpsSchema._type;

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '16px',
        },
        head: {
          fontSize: '15px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '25px',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          fontSize: '16px',
        },
        selectLabel: {
          fontSize: '16px',
        },
        displayedRows: {
          fontSize: '16px',
        },
        select: {
          fontSize: '16px',
        },
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          fontSize: '16px',
        },
      },
    },
  },
});

function TableOps({ data }: { data: OpsData }) {
  const columns = useMemo<MRT_ColumnDef<OpsData[number]>[]>(
    () => [
      { accessorKey: 'ID_Registro', header: 'ID', enableHiding: true },
      { accessorKey: 'ID_Usuario', header: 'ID_USER', enableHiding: true },
      { accessorKey: 'ID_Matricula', header: 'MATRICULA', enableHiding: true },
      { accessorKey: 'TipoMov', header: 'TipoMov', enableHiding: true },
      { accessorKey: 'Fecha_Ope', header: 'FECHA', enableHiding: true },
      { accessorKey: 'origen', header: 'ORIGEN', enableHiding: true },
      { accessorKey: 'destino', header: 'DESTINO', enableHiding: true },
      { accessorKey: 'ID_IATA_Aeropuerto', header: 'RUTA', enableHiding: true },
      { accessorKey: 'Hora_ITI', header: 'HORA_ITI', enableHiding: true },
      { accessorKey: 'Hora_Real', header: 'HORA_REAL', enableHiding: true },
      { accessorKey: 'Hora_Calzos', header: 'HORA_CALZOS', enableHiding: true },
      { accessorKey: 'Fin_OPS', header: 'FIN_OPS', enableHiding: true },
      { accessorKey: 'ID_Aerolinea', header: 'AEROLINEA', enableHiding: true },
      { accessorKey: 'Adulto_Nac', header: 'ADULTO NAC', enableHiding: true },
      { accessorKey: 'Infante_Nac', header: 'INFANTE NAC', enableHiding: true },
      { accessorKey: 'Transito_Nac', header: 'TRANSITO NAC', enableHiding: true },
      { accessorKey: 'Conexion_Nac', header: 'CONEXION NAC', enableHiding: true },
      { accessorKey: 'Excento_Nac', header: 'EXCENTO NAC', enableHiding: true },
      { accessorKey: 'Adulto_Int', header: 'ADULTO INT', enableHiding: true },
      { accessorKey: 'Infante_Int', header: 'INFANTE INT', enableHiding: true },
      { accessorKey: 'Transito_Int', header: 'TRANSITO INT', enableHiding: true },
      { accessorKey: 'Conexion_Int', header: 'CONEXION INT', enableHiding: true },
      { accessorKey: 'Excento_Int', header: 'EXCENTO INT', enableHiding: true },
      { accessorKey: 'totalNac', header: 'TOTAL NAC', enableHiding: true },
      { accessorKey: 'totalInt', header: 'TOTAL INT', enableHiding: true },
      { accessorKey: 'totalPax', header: 'TOTAL PAX', enableHiding: true },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableGlobalFilter: true,
    enableColumnOrdering: false,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      columnVisibility: {
        ID_Registro: false,
        ID_Usuario: false,
      },
    },
    renderBottomToolbarCustomActions: ({ table }) => {
      const visibleRows = table.getFilteredRowModel().rows;
    
      const total_Nac = visibleRows.reduce(
        (sum, row) => sum + Number(row.original.totalNac || 0),
        0
      );
      const total_Int = visibleRows.reduce(
        (sum, row) => sum + Number(row.original.totalInt || 0),
        0
      );

      const total_Ops = visibleRows.length; // o si necesitas contar cierto tipo:
      // visibleRows.filter(row => row.original.TipoMov === 'algo').length

      const totalPasajeros = total_Nac + total_Int;
    
      const numberFormatter = new Intl.NumberFormat('es-MX');
    
      return (
        <Box
          component={Paper}
          elevation={3}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            margin: 2,
            gap: 4, // Espaciado entre elementos
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: '1.5rem', color: 'primary.main' }}
          >
            Total Nac: {numberFormatter.format(total_Nac)}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: '1.5rem', color: 'primary.main' }}
          >
            Total Int: {numberFormatter.format(total_Int)}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: '1.8rem', color: 'primary.dark' }}
          >
            Total Pasajeros: {numberFormatter.format(totalPasajeros)}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: '1.8rem', color: 'primary.dark' }}
          >
            Total Operaciones: {numberFormatter.format(total_Ops)}
          </Typography>
        </Box>
      );
    },    
    
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}

export default TableOps;

