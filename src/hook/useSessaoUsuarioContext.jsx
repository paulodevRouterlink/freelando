import { useContext } from "react";
import { SessaoUsuarioContext } from "../contexto/SessaoUsuario";

export function useSessaoUsuarioContext() {
  return useContext(SessaoUsuarioContext);
}