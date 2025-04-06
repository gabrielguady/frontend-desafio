export const URLS = {
  BASE:'http://localhost:8000/api/core/numeros/',
  PROCESSAMENTO: 'processar/',
  DATA_SOURCE: '',
  STATUS: (pk: number | string) => `${pk}/status/`
}
