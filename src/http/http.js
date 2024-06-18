import axios from "axios";
import { ArmazenadorToken } from "../../ArmazenadorToken";

const http = axios.create({
  baseURL: 'http://localhost:8080/'
});


http.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = ArmazenadorToken.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Token foi adicionado ao headers')
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const routesIgnoreErrors = ['/auth/login', 'auth/refresh'];

const tentarRenovarToken = async () => {
  const token = ArmazenadorToken.refreshToken;
  return await axios.get('http://localhost:8080/auth/refresh', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => ArmazenadorToken.definirTokens(
    response.data.access_token,
    response.data.refresh_token,
  )).catch((err) => console.log(err))
}

const lidarComError401 = async (error) => {
  await tentarRenovarToken().then(() => http(error.config))
  return Promise.reject(error)
}

http.interceptors.response.use((response) => response,
  function (error) {
  if (!routesIgnoreErrors.includes(error.config.url) && error.response.status === 401) {
    // token expirou, vamos renovar
    return lidarComError401(error);
  }

  return Promise.reject(error);
});

export default http;