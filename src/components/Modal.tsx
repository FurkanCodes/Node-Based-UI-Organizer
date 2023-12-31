import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Dropdown from './Dropdown';

function Modal({ setName, onAdd, setHide, hide, nodeType, 
    setNodeType }) {
 const submitted = (event) => {
    onAdd(event);
    setHide(false);
 };

 return (
    <>
      <Transition appear show={hide} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setHide}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6  text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                 <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                 >
                    Enter Node Name
                 </Dialog.Title>
                 <div className="mt-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" placeholder="Enter node name" type="text" onChange={(e) => {
                      setName(e.target.value);
                    }} />
                    <Dropdown setNodeType={setNodeType}  />
                 </div>
                 <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={submitted}
                    >
                      Submit
                    </button>
                 </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
 );
}

export default Modal;