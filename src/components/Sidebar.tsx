import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Modal from './Modal';

function Sidebar({name, setName, onAdd, nodeType, 
  setNodeType}) {

  const [hide, setHide] = useState<boolean>(false)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
      const onDragStart = (event, nodeType) => {
       console.log(event)
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        
      };

      const onDragEnd= (event, nodeType) => { 
  
   console.log(event)




        setHide(true)
        setName("")
    
      }
    

   
  return (
    <Menu as="div" className="fixed left-5 mt-2 w-25 ">
      {hide &&  <Modal  nodeType={nodeType} setNodeType={setNodeType}  setName={setName} onAdd={onAdd} hide={hide} setHide={setHide}/>}
     
    <div>
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-teal- px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
     Add new nodes
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
     <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
        <p className="ml-5 mt-1 truncate text-xs leading-5 text-gray-500">
           Drag and Drop these to the pane
          </p>
          <Menu.Item>
            {({ active }) => (
              <a
              onDragEnd={event => onDragEnd(event, "input")}    
               onDragStart={(event) => onDragStart(event, "input")} draggable
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900 border' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
            New Node
              </a>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
  )
}

export default Sidebar