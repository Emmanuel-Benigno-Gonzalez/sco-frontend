import api from '../lib/axios'
import {isAxiosError} from 'axios'
import { UserRegistrationForm } from '../types'

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post('/auth/sign-up', formData)
    return data.message
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}

export async function loginAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post('/auth/sign-in', formData)
    localStorage.setItem('AUTH_TOKEN', data)
    return data.message
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message)
    }
  }
}


