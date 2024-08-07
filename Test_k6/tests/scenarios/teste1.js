import http from 'k6/http';
import { check, fail,sleep } from 'k6';
import { errorRate } from '../options/loadTestOptions.js';

export default function () {
    let res = http.get('https://localhost:7148/Test/Teste1');

    console.info(res);
    console.log("Passei aqui 1");

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 500ms': (r) => r.timings.duration < 500,
      }) || errorRate.add(1);
    sleep(1);
}