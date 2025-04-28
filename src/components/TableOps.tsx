import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { consultarOpsSchema } from '../types/index';
import { useMemo } from "react";

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
