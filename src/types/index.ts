import { z } from 'zod'

/** Auth & Users **/
const authSchema = z.object({
    ID_Usuario: z.number().nullable(),
    Nombre: z.string(),
    ApPaterno: z.string(),
    ApMaterno: z.string(),
    Password: z.string(),
    Password_Confirmation: z.string(),
    Tipo_Usuario: z.number().nullable()
})

export const consultaAuthSchema = z.array(
  authSchema.pick({
    ID_Usuario: true,
    Nombre: true,
    ApPaterno: true,
    ApMaterno: true,
    Tipo_Usuario: true
  })
)

const mov = ["S", "L"] as const;
const calf = ["RP", "FP"] as const;

export type Mov = (typeof mov)[number];
export type Calf = (typeof calf)[number];

export const mappedMovimiento: {[key in Mov]: string} = {
  S: "Salida",
  L: "Llegada"
}

export const mappedCalificador: {[key in Calf]: string} = {
  RP: "Regular de Pasajeros",
  FP: "Fletamento de Pasajeros"
}

export const safeNumericString = () => 
  z.string()
    .transform(value => value === '' ? '0' : value)
    .refine(value => !isNaN(Number(value)), {
      message: "El campo debe ser un valor numérico",
    })

export const opsSchema = z.object({
  ID_Usuario: z.number(),
  ID_Matricula: z.string()
    .min(1, { message: "La matrícula es requerida" })
    .transform((val) => val.toUpperCase()),
  TipoMov: z.string()
    .min(1, { message: "El tipo de movimiento es requerido" }),
  Fecha_Ope: z.string()
    .min(8, { message: "El campo fecha es requerido" })
    .transform((val) => {
      if (val.includes('T')) {
        return val.split('T')[0];
      }
      return val;
    })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Formato de fecha inválido. Usa AAAA-MM-DD",
    }),
  ID_IATA_Aeropuerto: z.string()
  .length(3, { message: "El campo debe tener exactamente 3 caracteres" }),
  Hora_ITI: z.string()
    .min(6, { message: "El campo es requerido" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
  Hora_Real: z.string()
    .min(6, { message: "El campo es requerido" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
/*  Hora_Calzos: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
  Fin_OPS: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),*/
  ID_Aerolinea: z.string()
    .min(1, { message: "El FBO/Aerolinea es requerido" }),
  Vuelo: z.string()
    .min(1, { message: "El número de vuelo es requerido" }),
  Pista: z.string()
    .min(1, { message: "La Pista es requerida" }),
  ID_Calificador: z.string()
    .min(1, { message: "El campo  es requerido" }),
  Posicion: z.string(),
  Puerta: safeNumericString(),
  Banda: safeNumericString(),
  Adulto_Nac: safeNumericString(),
  Infante_Nac: safeNumericString(),
  Transito_Nac: safeNumericString(),
  Conexion_Nac: safeNumericString(),
  Excento_Nac: safeNumericString(),
  Adulto_Int: safeNumericString(),
  Infante_Int: safeNumericString(),
  Transito_Int: safeNumericString(),
  Conexion_Int: safeNumericString(),
  Excento_Int: safeNumericString(),
  Pza_Equipaje: safeNumericString(),
  Kgs_Equipaje: safeNumericString(),
  Kgs_Carga: safeNumericString(),
  Correo: z.string(),
  Observaciones: z.string()
});

export const consultarOpsSchema = z.array(
  opsSchema.pick({
      ID_Usuario: true,
      ID_Matricula: true,
      TipoMov: true,
      Fecha_Ope: true,
      ID_IATA_Aeropuerto: true,
      Hora_ITI: true,
      Hora_Real: true,
      //Hora_Calzos: true,
      //Fin_OPS: true,
      ID_Aerolinea: true,
      Vuelo: true,
      Pista: true,
      ID_Calificador: true,
      Posicion: true,
      Puerta: true,
      Banda: true,
      Adulto_Nac: true,
      Infante_Nac: true,
      Transito_Nac: true,
      Conexion_Nac: true,
      Excento_Nac: true,
      Adulto_Int: true,
      Infante_Int: true,
      Transito_Int: true,
      Conexion_Int: true,
      Excento_Int: true,
      Pza_Equipaje: true,
      Kgs_Equipaje: true,
      Kgs_Carga: true,
      Correo: true,
      Observaciones: true
  }).extend({
      ID_Registro: z.string(),
      Hora_Calzos: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
      Fin_OPS: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
      totalNac: z.number(),
      totalInt: z.number(),
      totalPax: z.number(),
      origen: z.string(),
      destino: z.string()  
  })
)

export interface OPSRegistrationFormTransformed extends Omit<OPSRegistrationForm, 
  | 'Puerta' 
  | 'Banda' 
  | 'Adulto_Nac' 
  | 'Infante_Nac' 
  | 'Transito_Nac' 
  | 'Conexion_Nac' 
  | 'Excento_Nac' 
  | 'Adulto_Int' 
  | 'Infante_Int' 
  | 'Transito_Int' 
  | 'Conexion_Int' 
  | 'Excento_Int' 
  | 'Pza_Equipaje' 
  | 'Kgs_Equipaje' 
  | 'Kgs_Carga'
> {
  Puerta: number;
  Banda: number;
  Adulto_Nac: number;
  Infante_Nac: number;
  Transito_Nac: number;
  Conexion_Nac: number;
  Excento_Nac: number;
  Adulto_Int: number;
  Infante_Int: number;
  Transito_Int: number;
  Conexion_Int: number;
  Excento_Int: number;
  Pza_Equipaje: number;
  Kgs_Equipaje: number;
  Kgs_Carga: number;
}

export interface OPSConsultationFormTransformed extends Omit<OPSConsultar, 
  | 'Puerta' 
  | 'Banda' 
  | 'Adulto_Nac' 
  | 'Infante_Nac' 
  | 'Transito_Nac' 
  | 'Conexion_Nac' 
  | 'Excento_Nac' 
  | 'Adulto_Int' 
  | 'Infante_Int' 
  | 'Transito_Int' 
  | 'Conexion_Int' 
  | 'Excento_Int' 
  | 'Pza_Equipaje' 
  | 'Kgs_Equipaje' 
  | 'Kgs_Carga'
> {
  Puerta: string;
  Banda: string;
  Adulto_Nac: string;
  Infante_Nac: string;
  Transito_Nac: string;
  Conexion_Nac: string;
  Excento_Nac: string;
  Adulto_Int: string;
  Infante_Int: string;
  Transito_Int: string;
  Conexion_Int: string;
  Excento_Int: string;
  Pza_Equipaje: string;
  Kgs_Equipaje: string;
  Kgs_Carga: string;
}

type Auth = z.infer< typeof authSchema >
export type UserLoginForm = Pick<Auth, 'ID_Usuario' | 'Password'>
export type UserRegistrationForm = Pick<Auth, 'ID_Usuario' | 'Nombre' | 'ApPaterno' | 'ApMaterno' |'Password' | 'Password_Confirmation' | 'Tipo_Usuario' >

type OPS = z.infer< typeof opsSchema >
export type OPSRegistrationForm = Pick<OPS, 
        'ID_Usuario' | 'ID_Matricula' | 'TipoMov' | 'Fecha_Ope' | 
        'ID_IATA_Aeropuerto' |'Hora_ITI' | 'Hora_Real' |
        //'Hora_Calzos' | 'Fin_OPS' |
        'ID_Aerolinea' | 'Vuelo' | 'Pista' | 'ID_Calificador' |
        'Posicion' | 'Puerta' | 'Banda' | 'Adulto_Nac' |
        'Infante_Nac' | 'Transito_Nac' | 'Conexion_Nac' |
        'Excento_Nac' | 'Adulto_Int' | 'Infante_Int' |
        'Transito_Int' | 'Conexion_Int' | 'Excento_Int' |
        'Pza_Equipaje' | 'Kgs_Equipaje' | 'Kgs_Carga' |
        'Correo' | 'Observaciones'
        >

type OPSConsult = z.infer<typeof consultarOpsSchema>[number];
export type OPSConsultar = Pick<OPSConsult, 
        'ID_Usuario' | 'ID_Matricula' | 'TipoMov' | 'Fecha_Ope' | 
        'ID_IATA_Aeropuerto' |'Hora_ITI' | 'Hora_Real' |
        //'Hora_Calzos' | 'Fin_OPS' |
        'ID_Aerolinea' | 'Vuelo' | 'Pista' | 'ID_Calificador' |
        'Posicion' | 'Puerta' | 'Banda' | 'Adulto_Nac' |
        'Infante_Nac' | 'Transito_Nac' | 'Conexion_Nac' |
        'Excento_Nac' | 'Adulto_Int' | 'Infante_Int' |
        'Transito_Int' | 'Conexion_Int' | 'Excento_Int' |
        'Pza_Equipaje' | 'Kgs_Equipaje' | 'Kgs_Carga' |
        'Correo' | 'Observaciones' |
        'ID_Registro' | 'Hora_Calzos' | 'Fin_OPS' |
        'totalNac' | 'totalInt' | 'totalPax' | 'origen' | 'destino'
        >