import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

function NoteSaveStatus({ saveStatus }: { saveStatus: string }) {
  const generateSaveStatus = () => {
    switch (saveStatus) {
      case "Saved":
        return {
          text: "Salvo com sucesso",
          icon: <FaCheckCircle />,
          colorClass: "bg-green-200/50 text-green-700",
        };
      case "Saving":
        return {
          text: "Salvando...",
          icon: <FaSpinner className="animate-spin" />,
          colorClass: "bg-yellow-200/50 text-yellow-700",
        };
      case "SaveError":
        return {
          text: "Erro ao salvar. Tente novamente",
          icon: <FaTimesCircle />,
          colorClass: "bg-red-200/50 text-red-700",
        };
      case "InvalidContent":
        return {
          text: "Conteúdo inválido. A nota deve ter pelo menos 5 caracteres",
          icon: <FaExclamationCircle />,
          colorClass: "bg-orange-200/50 text-orange-700",
        };
      case "Unauthorized":
        return {
          text: "Não autorizado. Você não tem permissão para realizar esta ação",
          icon: <FaLock />,
          colorClass: "bg-blue-200/50 text-blue-700",
        };
      default:
        return {
          text: "Status desconhecido",
          icon: <FaExclamationCircle />,
          colorClass: "bg-gray-200/50 text-gray-700",
        };
    }
  };

  const { text, icon, colorClass } = generateSaveStatus();

  return (
    <div
      className={`mt-4 p-2 px-4 rounded-2xl ${colorClass} flex items-center space-x-3 w-fit`}
    >
      <div className="text-lg">{icon}</div>
      <div className="text-md">{text}</div>
    </div>
  );
}

export default NoteSaveStatus;
