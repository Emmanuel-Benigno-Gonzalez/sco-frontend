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

//const toUpperString = () =>
//    z.preprocess((arg) => typeof arg === 'string' ? arg.toUpperCase() : arg, z.string());
  

/** Registro de Operaciones **/
const opsSchema = z.object({
    ID_Usuario: z.number(),
    ID_Matricula: z.string(),
    TipoMov: z.string(),
    Fecha_Ope: z.preprocess((arg) => {
        if (typeof arg === "string") {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
    ID_IATA_Aeropuerto: z.string(),
    Hora_ITI: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
    Hora_Real: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
    Hora_Calzos: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
    Fin_OPS: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido"),
    ID_Aerolinea: z.string(),
    Vuelo: z.string(),
    Pista: z.string(),
    Posicion: z.string().nullable(),
    Puerta: z.number().nullable(),
    Banda: z.number().nullable(),
    Adulto_Nac: z.number().nullable(),
    Infante_Nac: z.number().nullable(),
    Transito_Nac: z.number().nullable(),
    Conexion_Nac: z.number().nullable(),
    Excento_Nac: z.number().nullable(),
    Adulto_Int: z.number().nullable(),
    Infante_Int: z.number().nullable(),
    Transito_Int: z.number().nullable(),
    Conexion_Int: z.number().nullable(),
    Excento_Int: z.number().nullable(),
    Pza_Equipaje: z.number().nullable(),
    Kgs_Equipaje: z.number().nullable(),
    Kgs_Carga: z.number().nullable(),
    Correo: z.string().nullable(),
    Observaciones: z.string().nullable()
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
        Hora_Calzos: true,
        Fin_OPS: true,
        ID_Aerolinea: true,
        Vuelo: true,
        Pista: true,
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
        ID_Registro: z.string()
    })
)

type Auth = z.infer< typeof authSchema >
export type UserLoginForm = Pick<Auth, 'ID_Usuario' | 'Password'>
export type UserRegistrationForm = Pick<Auth, 'ID_Usuario' | 'Nombre' | 'ApPaterno' | 'ApMaterno' |'Password' | 'Password_Confirmation' | 'Tipo_Usuario' >

type OPS = z.infer< typeof opsSchema >
export type OPSRegistrationForm = Pick<OPS, 
        'ID_Usuario' | 'ID_Matricula' | 'TipoMov' | 'Fecha_Ope' | 
        'ID_IATA_Aeropuerto' |'Hora_ITI' | 'Hora_Real' |
        'Hora_Calzos' | 'Fin_OPS' |
        'ID_Aerolinea' | 'Vuelo' | 'Pista' |
        'Posicion' | 'Puerta' | 'Banda' | 'Adulto_Nac' |
        'Infante_Nac' | 'Transito_Nac' | 'Conexion_Nac' |
        'Excento_Nac' | 'Adulto_Int' | 'Infante_Int' |
        'Transito_Int' | 'Conexion_Int' | 'Excento_Int' |
        'Pza_Equipaje' | 'Kgs_Equipaje' | 'Kgs_Carga' |
        'Correo' | 'Observaciones'
        >
