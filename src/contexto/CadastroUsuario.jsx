import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import http from '../http/http';

const usuarioInicial = {
  perfil: '',
  interesse: '',
  nomeCompleto: '',
  uf: '',
  cidade: '',
  email: '',
  senha: '',
  senhaConfirmada: ''
};

export const CadastroUsuarioContext = createContext({
  usuario: usuarioInicial,
  erros: {},
  setPerfil: () => null,
  setInteresse: () => null,
  setNomeCompleto: () => null,
  setUf: () => null,
  setCidade: () => null,
  setEmail: () => null,
  setSenha: () => null,
  setSenhaConfirmada: () => null,
  submeterUsuario: () => null,
  possoSelecionarInteresse: () => null
});

export const CadastroUsuarioProvider = ({ children }) => {

  const navegar = useNavigate();

  const [usuario, setUsuario] = useState(usuarioInicial);

  const setPerfil = (perfil) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      perfil
    }))
  }
  const setInteresse = (interesse) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      interesse
    }))
  }
  const setNomeCompleto = (nomeCompleto) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      nomeCompleto
    }))
  }
  const setUf = (uf) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      uf
    }))
  }
  const setCidade = (cidade) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      cidade
    }))
  }
  const setEmail = (email) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      email
    }))
  }
  const setSenha = (senha) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      senha
    }))
  }
  const setSenhaConfirmada = (senhaConfirmada) => {
    setUsuario(estadoAnterior => ({
      ...estadoAnterior,
      senhaConfirmada
    }))
  }

  const submeterUsuario = async () => {
    await http.post('auth/register', usuario).then((response) => {
      console.log(response)
      navegar('/cadastro/concluido')
    }).catch((error) => {
      console.error(error)
      console.log("Erro ao cadastrar usuário")
    })
  }

  const possoSelecionarInteresse = () => {
    return !!usuario.perfil
  }

  const contexto = {
    usuario,
    setPerfil,
    setInteresse,
    setNomeCompleto,
    setUf,
    setCidade,
    setEmail,
    setSenha,
    setSenhaConfirmada,
    submeterUsuario,
    possoSelecionarInteresse
  }

  return (
    <CadastroUsuarioContext.Provider value={contexto}>
      {children}
    </CadastroUsuarioContext.Provider>
  )
}

CadastroUsuarioProvider.propTypes = {
  children: PropTypes.ReactNode,
}