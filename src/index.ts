import { Listener } from './listeners/listener';

const main = async () => {
    const sepolia = new Listener(11155111);
    const goerli = new Listener(5);

    await sepolia.start();
    await goerli.start();
}

main();