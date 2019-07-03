import { createStore, thunk, action } from 'easy-peasy';

const model = {
    accounts: [],
    connectAccounts: thunk(async (actions) => {
        let accounts;
        if (typeof window.ethereum === 'undefined') return;
        try {
            accounts = await window.ethereum.enable();
            actions.updateAccounts(accounts);
        } catch (error) {
            console.log('Error accessing Ethereum.')
        }
    }),
    updateAccounts: action((_, payload) => {
        return { accounts: payload }
    }),
};

const store = createStore(model);

export default store;