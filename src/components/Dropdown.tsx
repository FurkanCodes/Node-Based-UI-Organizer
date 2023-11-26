import React, { useEffect, useRef, useState } from 'react';

function App({ setNodeType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeType, setInternalNodeType] = useState('Node Type'); // Internal state for displaying selected value
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (selectedType: string) => {
    setInternalNodeType(selectedType); // Update the displayed value
    setNodeType(selectedType);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex mt-2 justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 relative"
        onClick={handleButtonClick}
      >
        <span>{nodeType}</span>
        <span className="ml-2">
          {isOpen ? (
            <svg
              className="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleMenuItemClick('input')}
            >
              Input
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleMenuItemClick('output')}
            >
              Output
            </p>
            <p
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleMenuItemClick('default')}
            >
              Default
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
