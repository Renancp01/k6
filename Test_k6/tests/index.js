import teste from './scenarios/teste.js';
import teste1 from './scenarios/teste1.js';
import { group, sleep } from 'k6';
import { options } from './options.js';

export { options };

export default () => {
    group('teste', () => {
        teste();
    });

    group('teste1', () => {
        teste1();
    });

    sleep(1);
}