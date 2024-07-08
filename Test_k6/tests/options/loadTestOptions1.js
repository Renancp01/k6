import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let loadTestOptions1 = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up para 20 usuários em 30 segundos
    { duration: '1m', target: 20 },  // Mantém 20 usuários por 1 minuto
    { duration: '10s', target: 0 },  // Ramp-down para 0 usuários em 10 segundos
  ],
  thresholds: {
    'errors': ['rate<0.01'],  // Taxa de erros deve ser menor que 1%
    'http_req_duration': ['p(95)<500'],  // 95% das requisições devem ser menores que 500ms
  },
};
