import { sepoliaListener } from './listeners/sepoliaListener';
import { goerliListener } from './listeners/goerliListener';

const main = async () => {
    await sepoliaListener();
    await goerliListener();
}

main();