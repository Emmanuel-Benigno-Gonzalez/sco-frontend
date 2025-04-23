import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

export default function NavMenu() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth/login');
  };


  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center p-4 rounded-lg bg-slate-500 hover:bg-slate-400">
        <Bars3Icon className="w-10 h-10 text-white" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 mt-4 w-80 rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
          <div className="p-6">
            <p className="mb-4 text-lg font-bold text-gray-800">Hola, Usuario</p>
            <div className="flex flex-col gap-4">
              <Link
                to="/profile"
                className="block px-6 py-3 text-lg font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-indigo-100 hover:text-indigo-700"
              >
                Mi Perfil
              </Link>
              <button
                className="w-full px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
