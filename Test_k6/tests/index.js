import teste from './scenarios/teste.js';
import teste1 from './scenarios/teste1.js';
import { loadTestOptions } from './options/loadTestOptions.js';
import { loadTestOptions1 } from './options/loadTestOptions1.js';
import { group, sleep } from 'k6';
import { options as defaultOptions } from './options/loadTestOptions1.js'; // Importando opções padrão

const scenarioName = __ENV.SCENARIO || 'teste';
const optionsName = __ENV.OPTIONS || 'loadTestOption';

const scenarios = {
    teste,
    teste1,
};

const optionsModules = {
    loadTestOptions,
    loadTestOptions1
};

let scenario = scenarios[scenarioName];
if (!scenario) {
    console.error(`Cenário ${scenarioName} não encontrado! Usando cenário padrão.`);
    scenario = scenarios['teste']; // Fallback
}

let options = optionsModules[optionsName];
if (!options) {
    console.error(`Opções ${optionsName} não encontradas! Usando opções padrão.`);
    options = optionsModules['loadTestOptions']; // Fallback
}

export { options };

export default () => {
    group(scenarioName, () => {
        scenario();
    });

    sleep(1);
};

//k6 run --env SCENARIO=teste1 index.js