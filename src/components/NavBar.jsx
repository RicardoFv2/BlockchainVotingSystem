import React from "react";

export default function Menu(props) {
  return (
    <div>
      <header className="bg-blue-500 p-4">
        <nav className="container mx-auto">
          <ul className="flex justify-between items-center">
            <li>
              <h1 className="text-white hover:text-gray-200">
                Dirección: {props.mostrarDireccion}
              </h1>
            </li>
            <li>
              <h1 className="text-white hover:text-gray-200">
                Balance: {props.mostrarBalance}
              </h1>
            </li>
            <li>
              <button
                className="bg-white text-blue-500 hover:bg-blue-400 text-sm rounded-full px-4 py-2"
                onClick={props.conectarWallet}
              >
                Connect Wallet
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
