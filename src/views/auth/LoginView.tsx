import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from "../../api/AuthAPI";
import { toast } from 'react-toastify'


export default function LoginView() {

  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    ID_Usuario: null,
    Password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: loginAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Usuario</label>

          <input
            id="ID_Usuario"
            type="text"
            placeholder="Usuario de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("ID_Usuario", {
              required: "El id del usuario es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "Id de usuario no válido",
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
          >Password</label>

          <input
            type="Password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("Password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.Password && (
            <ErrorMessage>{errors.Password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-cyan-600 hover:bg-cyan-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={'/auth/register'}
            className="text-center text-gray-300 font-normal"
          >¿No tienes una Cuenta? Crear Cuenta</Link>
      </nav>

    </>
  )
}