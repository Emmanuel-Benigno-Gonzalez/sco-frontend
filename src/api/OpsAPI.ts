import api from '../lib/axios'
import {isAxiosError} from 'axios'
import { OPSRegistrationForm } from '../types'

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