import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { consultarOpsSchema } from '../types/index';
import { useMemo } from "react";

type OpsData = typeof consultarOpsSchema._type;

const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
        head: {
          fontSize: '15px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '20px',
        },
      },
    },
  },
});

function TableOps({ data }: { data: OpsData }) {

  const columns = useMemo<MRT_ColumnDef<OpsData[number]>[]>(
    () => [
      {
        accessorKey: "ID_Registro",
        header: "ID",
        enableHiding: false,
      },
      {
        accessorKey: "ID_Usuario",
        header: "ID_USER",
        enableHiding: false,
      },
      {
        accessorKey: "ID_Matricula",
        header: "MATRICULA",
        enableHiding: false,
      },
      {
        accessorKey: "TipoMov",
        header: "TipoMov",
        enableHiding: false,
      },
      {
        accessorKey: "Fecha_Ope",
        header: "FECHA",
        enableHiding: false,
        Cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          return date.toLocaleDateString(); // Esto corrige el error
        }
      }
      
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
}

export default TableOps;
