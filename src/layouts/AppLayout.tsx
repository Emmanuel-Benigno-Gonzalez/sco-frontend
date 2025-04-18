import { Outlet, Link } from 'react-router-dom'
import NavMenu from '../components/NavMenu'
import { ToastContainer }  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AppLayout() {
    return (
        <>
            <header>
                <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-evenly items-center'>
                    <h1 className="titulo">SCO</h1>
                    <NavMenu />
                </div>
            </header>

            <div className="nav-bg">
                <nav className="navegacion-principal contenedor">
                    <Link
                        to='/'
                    >Registrar</Link>
                    <Link
                        to='/operations/consult'
                    >Consultar</Link>
                    <Link
                        to='/operations/edit'
                    >Editar</Link>
                </nav>
            </div>
    
            <main className="contenedor sombra">
                <Outlet/> /**https://www.youtube.com/watch?v=bEUOZMu4JRI&t=459s
                https://www.material-react-table.com/docs/examples/editing-crud
                https://www.youtube.com/watch?v=fJRyC-xLIQc*/
            </main>

            <footer className="bg-black mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">AIT - Todos los derechos Reservados</p>
                </div>
            </footer>

            <ToastContainer 
              pauseOnHover={false}
              pauseOnFocusLoss={false}
            />
            
        </>

    )
}