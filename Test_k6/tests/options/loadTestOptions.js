import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let loadTestOptions = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up para 20 usuários em 30 segundos
    { duration: '1m', target: 10 },  // Mantém 20 usuários por 1 minuto
    { duration: '10s', target: 0 },  // Ramp-down para 0 usuários em 10 segundos
  ],
  thresholds: {
    'errors': ['rate<0.01'],  // Taxa de erros deve ser menor que 1%
    'http_req_duration': ['p(95)<500'],  // 95% das requisições devem ser menores que 500ms
  },
};

//Teste de carga básica
// export let options = {
//     stages: [
//       { duration: '30s', target: 20 }, // Ramp-up para 20 usuários em 30 segundos
//       { duration: '1m', target: 20 },  // Mantém 20 usuários por 1 minuto
//       { duration: '30s', target: 0 },  // Ramp-down para 0 usuários em 30 segundos
//     ],
//     thresholds: {
//       'http_req_duration': ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
//     },
//   };


//Teste de stress
// export let options = {
//     stages: [
//       { duration: '1m', target: 50 }, // Ramp-up para 50 usuários em 1 minuto
//       { duration: '2m', target: 100 }, // Mantém 100 usuários por 2 minutos
//       { duration: '2m', target: 200 }, // Aumenta para 200 usuários em 2 minutos
//       { duration: '1m', target: 0 },   // Ramp-down para 0 usuários em 1 minuto
//     ],
//     thresholds: {
//       'http_req_duration': ['p(99)<1500'], // 99% das requisições devem ser menores que 1500ms
//       'http_req_failed': ['rate<0.02'],    // Menos de 2% das requisições devem falhar
//     },
//   };

//Teste de pico
// export let options = {
//     stages: [
//       { duration: '10s', target: 50 }, // Ramp-up para 50 usuários em 10 segundos
//       { duration: '20s', target: 50 }, // Mantém 50 usuários por 20 segundos
//       { duration: '10s', target: 200 }, // Aumento abrupto para 200 usuários em 10 segundos
//       { duration: '20s', target: 200 }, // Mantém 200 usuários por 20 segundos
//       { duration: '10s', target: 0 },   // Ramp-down para 0 usuários em 10 segundos
//     ],
//     thresholds: {
//       'http_req_duration': ['p(90)<800', 'p(95)<1000'], // 90% das requisições devem ser menores que 800ms e 95% menores que 1000ms
//       'http_req_failed': ['rate<0.05'],                 // Menos de 5% das requisições devem falhar
//     },
//   };

//Teste de endurance
// export let options = {
//     stages: [
//       { duration: '5m', target: 100 }, // Ramp-up para 100 usuários em 5 minutos
//       { duration: '1h', target: 100 }, // Mantém 100 usuários por 1 hora
//       { duration: '5m', target: 0 },   // Ramp-down para 0 usuários em 5 minutos
//     ],
//     thresholds: {
//       'http_req_duration': ['p(95)<1200'], // 95% das requisições devem ser menores que 1200ms
//       'http_req_failed': ['rate<0.01'],    // Menos de 1% das requisições devem falhar
//       'http_req_sending': ['avg<100'],     // Tempo médio de envio de requisições deve ser menor que 100ms
//     },
//   };

//Teste de capacidade
// export let options = {
//     stages: [
//       { duration: '2m', target: 100 }, // Ramp-up para 100 usuários em 2 minutos
//       { duration: '2m', target: 200 }, // Ramp-up para 200 usuários em 2 minutos
//       { duration: '2m', target: 300 }, // Ramp-up para 300 usuários em 2 minutos
//       { duration: '2m', target: 400 }, // Ramp-up para 400 usuários em 2 minutos
//       { duration: '2m', target: 0 },   // Ramp-down para 0 usuários em 2 minutos
//     ],
//     thresholds: {
//       'http_req_duration': ['p(95)<1500'], // 95% das requisições devem ser menores que 1500ms
//       'http_req_failed': ['rate<0.05'],    // Menos de 5% das requisições devem falhar
//       'vus_max': ['value<500'],            // O número máximo de usuários virtuais deve ser menor que 500
//     },
//   };

//Stages:
// Ramp-up: Período durante o qual o número de usuários aumenta gradualmente.
// Steady State: Período durante o qual o número de usuários é mantido constante.
// Ramp-down: Período durante o qual o número de usuários diminui gradualmente.
// Thresholds:

//Thresholds:
// http_req_duration: Tempo de duração das requisições HTTP. Pode incluir percentis (p(95) para o 95º percentil) e valores específicos (avg para média).
// http_req_failed: Taxa de falhas das requisições HTTP. Usado para garantir que um percentual mínimo de requisições seja bem-sucedido.
// vus_max: Número máximo de usuários virtuais. Usado para verificar a capacidade do sistema de lidar com um número específico de usuários.

// thresholds: {
//     'checks': ['rate>0.95'], // Pelo menos 95% das verificações devem passar
//     'data_received': ['count>0'], // Deve haver dados recebidos
//     'data_sent': ['count>0'], // Deve haver dados enviados
//     'errors': ['rate<0.01'], // Taxa de erro deve ser menor que 1%
//     'group_duration': ['avg<2s', 'p(90)<2.5s'], // Duração média do grupo deve ser menor que 2s e 90% dos grupos devem ser menores que 2.5s
//     'http_req_blocked': ['avg<100ms'], // Tempo médio de bloqueio deve ser menor que 100ms
//     'http_req_connecting': ['avg<50ms'], // Tempo médio de conexão deve ser menor que 50ms
//     'http_req_duration': ['avg<500ms', 'p(95)<800ms'], // Tempo médio de requisição deve ser menor que 500ms e 95% das requisições devem ser menores que 800ms
//     'http_req_failed': ['rate<0.05'], // Menos de 5% das requisições devem falhar
//     'http_req_receiving': ['avg<200ms'], // Tempo médio de recebimento deve ser menor que 200ms
//     'http_req_sending': ['avg<10ms'], // Tempo médio de envio deve ser menor que 10ms
//     'http_req_tls_handshaking': ['avg<100ms'], // Tempo médio de handshake TLS deve ser menor que 100ms
//     'http_req_waiting': ['avg<500ms'], // Tempo médio de espera deve ser menor que 500ms
//     'http_reqs': ['count>1000'], // Deve haver mais de 1000 requisições HTTP
//     'iteration_duration': ['avg<5s'], // Duração média da iteração deve ser menor que 5s
//     'iterations': ['count>500'], // Deve haver mais de 500 iterações
//     'vus': ['max>10'], // Deve haver pelo menos 10 usuários virtuais em algum momento
//     'vus_max': ['max>20'], // O número máximo de usuários virtuais deve ser maior que 20
//   },