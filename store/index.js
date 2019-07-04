import { createStore, thunk, action } from 'easy-peasy';
import contract from 'truffle-contract';
import contractJSON from '../build/contracts/Polygoons.json';

const GameContract = contract(contractJSON)

const model = {
    accounts: [],
    contract: undefined,
    connect: thunk(async (actions) => {
        if (typeof window.ethereum === 'undefined') return;
        try {
            const accounts = await window.ethereum.enable();
            GameContract.setProvider(window.web3.currentProvider);
            const contract = await GameContract.at("0x037b7E9d7Ce9FB83A2cB9A25a404E604C5bB5D51");
            actions.initGame({ accounts, contract })
        } catch (error) {
            console.log('Error accessing Ethereum.', error)
        }
    }),
    initGame: action((_, payload) => {
        return { ...payload }
    }),
};

const store = createStore(model);

export default store;