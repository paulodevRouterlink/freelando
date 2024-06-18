import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { ArmazenadorToken } from "../../ArmazenadorToken";
import http from "../http/http";

export const SessaoUsuarioContext = createContext({
  usuarioLogado: false,
  // eslint-disable-next-line no-unused-vars
  login: (email, senha) => null,
  logout: () => null,
  perfil: {}
})

export const SessaoUsuarioProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(!!ArmazenadorToken.accessToken)
  const [perfil, setPerfil] = useState({})

  const login = async (email, senha) => {
    await http.post('auth/login', {
      email,
      senha
    }).then((response) => {
      ArmazenadorToken.definirTokens(
        response.data.access_token,
        response.data.refresh_token
      )
      setUsuarioLogado(true)
    }).catch((error) => {
      console.error(error)
    })
  }

  const logout = () => {
    ArmazenadorToken.efetuarLogout()
    setUsuarioLogado(false)
  }

  return (
    <SessaoUsuarioContext.Provider
      value={{
        login,
        logout,
        perfil,
        usuarioLogado,
        setPerfil,
      }}
    >
      {children}
    </SessaoUsuarioContext.Provider>
  )
}

SessaoUsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired
}