import { useContext } from "react";
import { CadastroUsuarioContext } from "../contexto/CadastroUsuario";

export const useCadastroUsuarioContext = () => {
  return useContext(CadastroUsuarioContext);
}