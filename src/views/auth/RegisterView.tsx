import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../api/AuthAPI";
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

export default function RegisterView() {

  const navigate = useNavigate()
  
  const initialValues: UserRegistrationForm = {
    ID_Usuario: null,
    Nombre: '',
    ApPaterno: '',
    ApMaterno: '',
    Password: '',
    Password_Confirmation: '',
    Tipo_Usuario: null
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const Password = watch('Password');

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/auth/login')
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)        

  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-cyan-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Id Usuario</label>
          <input
            id="ID_Usuario"
            type="text"
            placeholder="Id de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("ID_Usuario", {
              required: "El Id de Usuario de registro es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "Id no válido",
              },
            })}
          />
          {errors.ID_Usuario && (
            <ErrorMessage>{errors.ID_Usuario.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("Nombre", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.Nombre && (
            <ErrorMessage>{errors.Nombre.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Apellido Paterno</label>
          <input
            type="name"
            placeholder="Apellido Paterno"
            className="w-full p-3  border-gray-300 border"
            {...register("ApPaterno", {
              required: "El Apellido Paterno de usuario es obligatorio",
            })}
          />
          {errors.ApPaterno && (
            <ErrorMessage>{errors.ApPaterno.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Apellido Materno</label>
          <input
            type="name"
            placeholder="Apellido Materno"
            className="w-full p-3  border-gray-300 border"
            {...register("ApMaterno", {
              required: "El Apellido Materno de usuario es obligatorio",
            })}
          />
          {errors.ApMaterno && (
            <ErrorMessage>{errors.ApMaterno.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="Password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("Password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.Password && (
            <ErrorMessage>{errors.Password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="Password_Confirmation"
            type="Password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("Password_Confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === Password || 'Los Passwords no son iguales'
            })}
          />

          {errors.Password_Confirmation && (
            <ErrorMessage>{errors.Password_Confirmation.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl">
                Tipo de Usuario
            </label>
            <select
                className="w-full p-3 border-gray-300 border"
                {...register("Tipo_Usuario", {
                required: "El tipo de usuario es obligatorio",
                })}
            >
                <option value="">Seleccione un tipo de usuario</option>
                <option value={1}>Administrador</option>
                <option value={2}>Jefe de Turno</option>
                <option value={3}>Capturador</option>
            </select>
            {errors.Tipo_Usuario && (
                <ErrorMessage>{errors.Tipo_Usuario.message}</ErrorMessage>
            )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-cyan-600 hover:bg-cyan-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={'/auth/login'}
            className="text-center text-gray-300 font-normal"
          >¿Ya tienes una Cuenta? Iniciar Sesión</Link>
      </nav>

    </>
  )
}