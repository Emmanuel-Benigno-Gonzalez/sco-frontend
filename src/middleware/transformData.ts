// utils/transformFormData.ts
import { OPSConsultar, OPSConsultationFormTransformed, OPSRegistrationForm, OPSRegistrationFormTransformed } from '../types/index'


export function transformOPSFormData(formData: OPSRegistrationForm): OPSRegistrationFormTransformed {
    return {
      ...formData,
      Puerta: Number(formData.Puerta),
      Banda: Number(formData.Banda),
      Adulto_Nac: Number(formData.Adulto_Nac),
      Infante_Nac: Number(formData.Infante_Nac),
      Transito_Nac: Number(formData.Transito_Nac),
      Conexion_Nac: Number(formData.Conexion_Nac),
      Excento_Nac: Number(formData.Excento_Nac),
      Adulto_Int: Number(formData.Adulto_Int),
      Infante_Int: Number(formData.Infante_Int),
      Transito_Int: Number(formData.Transito_Int),
      Conexion_Int: Number(formData.Conexion_Int),
      Excento_Int: Number(formData.Excento_Int),
      Pza_Equipaje: Number(formData.Pza_Equipaje),
      Kgs_Equipaje: Number(formData.Kgs_Equipaje),
      Kgs_Carga: Number(formData.Kgs_Carga),
    }
}

export function transConsultarOPS(resData: OPSConsultar): OPSConsultationFormTransformed {
  return {
    ...resData,
    Puerta: String(resData.Puerta),
    Banda: String(resData.Banda),
    Adulto_Nac: String(resData.Adulto_Nac),
    Infante_Nac: String(resData.Infante_Nac),
    Transito_Nac: String(resData.Transito_Nac),
    Conexion_Nac: String(resData.Conexion_Nac),
    Excento_Nac: String(resData.Excento_Nac),
    Adulto_Int: String(resData.Adulto_Int),
    Infante_Int: String(resData.Infante_Int),
    Transito_Int: String(resData.Transito_Int),
    Conexion_Int: String(resData.Conexion_Int),
    Excento_Int: String(resData.Excento_Int),
    Pza_Equipaje: String(resData.Pza_Equipaje),
    Kgs_Equipaje: String(resData.Kgs_Equipaje),
    Kgs_Carga: String(resData.Kgs_Carga),
  }
}