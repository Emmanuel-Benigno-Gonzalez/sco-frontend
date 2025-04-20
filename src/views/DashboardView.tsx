import { useForm } from 'react-hook-form'
import { OPSRegistrationForm } from "@/types/index";
import ErrorMessage from "./../components/ErrorMessage";
import { createOPS } from "./../api/OpsAPI";
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

export default function DashboardView() {


  const initialValues: OPSRegistrationForm = {
    ID_Usuario: 2,
    ID_Matricula: '',
    TipoMov: '',
    Fecha_Ope: new Date(),
    ID_IATA_Aeropuerto: '',
    Hora_ITI: '',
    Hora_Real: '',
    Hora_Calzos: '',
    Fin_OPS: '',
    ID_Aerolinea: '',
    Vuelo: '',
    Pista: '',
    Posicion: '',
    Puerta: null,
    Banda: null,
    Adulto_Nac: null,
    Infante_Nac: null,
    Transito_Nac: null,
    Conexion_Nac: null,
    Excento_Nac: null,
    Adulto_Int: null,
    Infante_Int: null,
    Transito_Int: null,
    Conexion_Int: null,
    Excento_Int: null,
    Pza_Equipaje: null,
    Kgs_Equipaje: null,
    Kgs_Carga: null,
    Correo: '',
    Observaciones: ''
  }

  const {register, handleSubmit, reset, formState: {errors}} = useForm<OPSRegistrationForm>({defaultValues: initialValues})

  const { mutate } = useMutation({
    mutationFn: createOPS,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  
  const handleRegisterOPS = (formData: OPSRegistrationForm) => mutate(formData)        

  return (
    <>
      <h1> Captura de Operaciones</h1>

      <form 
        onSubmit={handleSubmit(handleRegisterOPS)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Matricula</label>
          <input
            id="ID_Matricula"
            type="text"
            placeholder="Matricula"
            className="w-full p-3  border-gray-300 border"
            {...register("ID_Matricula", {
              required: "La Matricula de registro es obligatorio",
            })}
          />
          {errors.ID_Matricula && (
            <ErrorMessage>{errors.ID_Matricula.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl">
                Tipo de Movimiento
            </label>
            <select
                className="w-full p-3 border-gray-300 border"
                {...register("TipoMov", {
                required: "El tipo de movimiento es obligatorio",
                })}
            >
                <option value="">Seleccione el tipo de Movimiento</option>
                <option value={'L'}>Llegada</option>
                <option value={'S'}>Salida</option>
            </select>
            {errors.TipoMov && (
                <ErrorMessage>{errors.TipoMov.message}</ErrorMessage>
            )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Fecha</label>
          <input
            id="Fecha_Ope"
            type="date"
            placeholder="Fecha"
            className="w-full p-3  border-gray-300 border"
            {...register("Fecha_Ope", {
              required: "La Fecha de registro es obligatoria",
            })}
          />
          {errors.Fecha_Ope && (
            <ErrorMessage>{errors.Fecha_Ope.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Destino/Origen</label>
          <input
            id="ID_IATA_Aeropuerto"
            type="text"
            placeholder="Aeropuerto de Destino/Origen (IATA)"
            className="w-full p-3  border-gray-300 border"
            {...register("ID_IATA_Aeropuerto", {
              required: "El Destino/Origen de registro es obligatorio",
              validate: (value) =>
                value.length === 3 || "El código IATA debe tener exactamente 3 caracteres"
            })}
          />
          {errors.ID_IATA_Aeropuerto && (
            <ErrorMessage>{errors.ID_IATA_Aeropuerto.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Hora_ITI">Hora Itinerario</label>
          <input
            id="Hora_ITI"
            type="time"
            step="1"
            className="w-full p-3 border-gray-300 border"
            {...register("Hora_ITI", {
              required: "La hora de itinerario es obligatoria"
            })}
          />
          {errors.Hora_ITI && <ErrorMessage>{errors.Hora_ITI.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Hora_Real">Hora Real</label>
          <input
            id="Hora_Real"
            type="time"
            step="1"
            className="w-full p-3 border-gray-300 border"
            {...register("Hora_Real", {
              required: "La hora Real es obligatoria"
            })}
          />
          {errors.Hora_Real && <ErrorMessage>{errors.Hora_Real.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Hora_Calzos">Hora Calzos</label>
          <input
            id="Hora_Calzos"
            type="time"
            step="1"
            className="w-full p-3 border-gray-300 border"
            {...register("Hora_Calzos", {
              validate: (value) => {
                if (!value) return true;
                return true; // `type="time"` ya limita el formato
              }
            })}
          />
          {errors.Hora_Calzos && <ErrorMessage>{errors.Hora_Calzos.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Fin_OPS">Fin OPS</label>
          <input
            id="Fin_OPS"
            type="time"
            step="1"
            className="w-full p-3 border-gray-300 border"
            {...register("Fin_OPS", {
              validate: (value) => {
                if (!value) return true;
                return true;
              }
            })}
          />
          {errors.Fin_OPS && <ErrorMessage>{errors.Fin_OPS.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >FBO/Aerolinea</label>
          <input
            id="ID_Aerolinea"
            type="text"
            placeholder="FBO/Aerolinea que Opero"
            className="w-full p-3  border-gray-300 border"
            {...register("ID_Aerolinea", {
              required: "El FBO/Aerolinea de registro es obligatorio",
              validate: (value) =>
                value.length === 3 || "El código IATA debe tener exactamente 3 caracteres"
            })}
          />
          {errors.ID_Aerolinea && (
            <ErrorMessage>{errors.ID_Aerolinea.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Vuelo</label>
          <input
            id="Vuelo"
            type="text"
            placeholder="Numero de Vuelo"
            className="w-full p-3  border-gray-300 border"
            {...register("Vuelo", {
              required: "El número de vuelo de registro es obligatorio",
            })}
          />
          {errors.Vuelo && (
            <ErrorMessage>{errors.Vuelo.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Pista</label>
          <input
            id="Pista"
            type="text"
            placeholder="Pista"
            className="w-full p-3  border-gray-300 border"
            {...register("Pista", {
              required: "La Pista de registro es obligatoria",
            })}
          />
          {errors.Pista && (
            <ErrorMessage>{errors.Pista.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Posicion</label>
          <input
            id="Posicion"
            type="text"
            placeholder="Posicion"
            className="w-full p-3  border-gray-300 border"
            {...register("Posicion", {
              validate: (value) => {
                if (!value) return true; // Permite que el campo esté vacío
                return /^[A-Za-z0-9]{1,10}$/.test(value) || "Solo letras y números (máx. 10 caracteres)";
              }
            })}
          />
          {errors.Posicion && (
            <ErrorMessage>{errors.Posicion.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Puerta</label>
          <input
            id="Puerta"
            type="number"
            placeholder="Puerta"
            className="w-full p-3  border-gray-300 border"
            {...register("Puerta", {
              valueAsNumber: true 
            })}
          />
          {errors.Puerta && (
            <ErrorMessage>{errors.Puerta.message}</ErrorMessage>
          )}
        </div>

        {/* Banda */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Banda">Banda</label>
          <input
            id="Banda"
            type="number"
            placeholder="Banda"
            className="w-full p-3 border-gray-300 border"
            {...register("Banda", {
              valueAsNumber: true
            })}
          />
          {errors.Banda && <ErrorMessage>{errors.Banda.message}</ErrorMessage>}
        </div>

        {/* Adulto Nac */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Adulto_Nac">Adulto Nac</label>
          <input
            id="Adulto_Nac"
            type="number"
            placeholder="Adultos Nacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Adulto_Nac", {
              valueAsNumber: true
            })}
          />
          {errors.Adulto_Nac && <ErrorMessage>{errors.Adulto_Nac.message}</ErrorMessage>}
        </div>

        {/* Infante Nac */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Infante_Nac">Infante Nac</label>
          <input
            id="Infante_Nac"
            type="number"
            placeholder="Infantes Nacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Infante_Nac", {
              valueAsNumber: true
            })}
          />
          {errors.Infante_Nac && <ErrorMessage>{errors.Infante_Nac.message}</ErrorMessage>}
        </div>

        {/* Transito Nac */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Transito_Nac">Tránsito Nac</label>
          <input
            id="Transito_Nac"
            type="number"
            placeholder="Tránsito Nacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Transito_Nac", {
              valueAsNumber: true
            })}
          />
          {errors.Transito_Nac && <ErrorMessage>{errors.Transito_Nac.message}</ErrorMessage>}
        </div>

        {/* Conexion Nac */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Conexion_Nac">Conexión Nac</label>
          <input
            id="Conexion_Nac"
            type="number"
            placeholder="Conexión Nacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Conexion_Nac", {
              valueAsNumber: true
            })}
          />
          {errors.Conexion_Nac && <ErrorMessage>{errors.Conexion_Nac.message}</ErrorMessage>}
        </div>

        {/* Excento Nac */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Excento_Nac">Excento Nac</label>
          <input
            id="Excento_Nac"
            type="number"
            placeholder="Excentos Nacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Excento_Nac", {
              valueAsNumber: true
            })}
          />
          {errors.Excento_Nac && <ErrorMessage>{errors.Excento_Nac.message}</ErrorMessage>}
        </div>

        {/* Adulto Int */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Adulto_Int">Adulto Int</label>
          <input
            id="Adulto_Int"
            type="number"
            placeholder="Adultos Internacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Adulto_Int", {
              valueAsNumber: true
            })}
          />
          {errors.Adulto_Int && <ErrorMessage>{errors.Adulto_Int.message}</ErrorMessage>}
        </div>

        {/* Infante Int */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Infante_Int">Infante Int</label>
          <input
            id="Infante_Int"
            type="number"
            placeholder="Infantes Internacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Infante_Int", {
              valueAsNumber: true
            })}
          />
          {errors.Infante_Int && <ErrorMessage>{errors.Infante_Int.message}</ErrorMessage>}
        </div>

        {/* Transito Int */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Transito_Int">Tránsito Int</label>
          <input
            id="Transito_Int"
            type="number"
            placeholder="Tránsito Internacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Transito_Int", {
              valueAsNumber: true
            })}
          />
          {errors.Transito_Int && <ErrorMessage>{errors.Transito_Int.message}</ErrorMessage>}
        </div>

        {/* Conexion Int */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Conexion_Int">Conexión Int</label>
          <input
            id="Conexion_Int"
            type="number"
            placeholder="Conexión Internacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Conexion_Int", {
              valueAsNumber: true
            })}
          />
          {errors.Conexion_Int && <ErrorMessage>{errors.Conexion_Int.message}</ErrorMessage>}
        </div>

        {/* Excento Int */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Excento_Int">Excento Int</label>
          <input
            id="Excento_Int"
            type="number"
            placeholder="Excentos Internacionales"
            className="w-full p-3 border-gray-300 border"
            {...register("Excento_Int", {
              valueAsNumber: true
            })}
          />
          {errors.Excento_Int && <ErrorMessage>{errors.Excento_Int.message}</ErrorMessage>}
        </div>

        {/* Pza Equipaje */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Pza_Equipaje">Pza Equipaje</label>
          <input
            id="Pza_Equipaje"
            type="number"
            placeholder="Piezas de Equipaje"
            className="w-full p-3 border-gray-300 border"
            {...register("Pza_Equipaje", {
              valueAsNumber: true
            })}
          />
          {errors.Pza_Equipaje && <ErrorMessage>{errors.Pza_Equipaje.message}</ErrorMessage>}
        </div>

        {/* Kgs Equipaje */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Kgs_Equipaje">Kgs Equipaje</label>
          <input
            id="Kgs_Equipaje"
            type="number"
            placeholder="Kilogramos de Equipaje"
            className="w-full p-3 border-gray-300 border"
            {...register("Kgs_Equipaje", {
              valueAsNumber: true
            })}
          />
          {errors.Kgs_Equipaje && <ErrorMessage>{errors.Kgs_Equipaje.message}</ErrorMessage>}
        </div>

        {/* Kgs Carga */}
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="Kgs_Carga">Kgs Carga</label>
          <input
            id="Kgs_Carga"
            type="number"
            placeholder="Kilogramos de Carga"
            className="w-full p-3 border-gray-300 border"
            {...register("Kgs_Carga", {
              valueAsNumber: true
            })}
          />
          {errors.Kgs_Carga && <ErrorMessage>{errors.Kgs_Carga.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Correo</label>
          <input
            id="Correo"
            type="text"
            placeholder="Correo"
            className="w-full p-3  border-gray-300 border"
            {...register("Correo", {
            })}
          />
          {errors.Correo && (
            <ErrorMessage>{errors.Correo.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="text"
          >Observaciones</label>
          <input
            id="Observaciones"
            type="text"
            placeholder="Observaciones"
            className="w-full p-3  border-gray-300 border"
            {...register("Observaciones", {
            })}
          />
          {errors.Observaciones && (
            <ErrorMessage>{errors.Observaciones.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrar'
          className="bg-cyan-600 hover:bg-cyan-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />

      </form>

    </>
  );
}
