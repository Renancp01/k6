import http from 'k6/http';
// import sleep from 'k6';
import { check, fail,sleep } from 'k6';
import { errorRate } from '../options.js';

export default function () {
    let res = http.get('https://localhost:7148/Test');
    // let duration = 'Falha';

    // console.info(res);
    console.log("Passei aqui");

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 500ms': (r) => r.timings.duration < 500,
      }) || errorRate.add(1);
    sleep(1);
}