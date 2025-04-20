import api from '../lib/axios'
import {isAxiosError} from 'axios'
import { consultarOpsSchema, OPSRegistrationForm } from '../types'

export async function createOPS(formData: OPSRegistrationForm) {
  try {
    const { data } = await api.post('/ops/create', formData)
    return data.message
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function getOPS(fechaInicio: string, fechaFin: string) {
  try {
    const { data } = await api(`/ops/findOpsbyDate?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    const response = consultarOpsSchema.safeParse(data)
    if (response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

/*export async function getOPS() {
  try {
    const fechaInicio = '2025-03-01';
    const fechaFin = '2025-04-30';
    const { data } = await api(`/ops/findOpsbyDate?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    
    const opsResponse = data;
    
    // Procesar las fechas
    const processedData = opsResponse.map(item => ({
      ...item,
      Fecha_Ope: new Date(item.Fecha_Ope),
    }));

    // Validar con Zod
    const result = consultarOpsSchema.safeParse(processedData);
    console.log(result)

    if (!result.success) {
      console.error("❌ Error de validación Zod:");
      
      result.error.errors.forEach((err, idx) => {
        console.error(`- [Index ${err.path[0]}] Campo: ${err.path.join('.')}, Mensaje: ${err.message}`);
      });

      throw new Error("Error de validación en los datos recibidos del backend.");
    }

    // Datos válidos
    return result.data;
    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    // Si el error es otro
    throw error;
  }
}*/
