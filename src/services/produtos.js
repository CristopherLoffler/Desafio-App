import http from './api';

export default {
  salvar: produto => {
    return http.post('produto', produto);
  },

  atualizar: produto => {
    return http.put('produto', produto);
  },

  listar: () => {
    return http.data;
  },

  apagar: produto => {
    return http.delete('produto', {data: produto});
  },
};
