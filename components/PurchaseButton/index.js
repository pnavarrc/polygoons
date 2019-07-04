import { useContext, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import DB from '../../context/orbit-db'

const GetGoonButton = ({ goon }) => {

    const [gotGoon, setGotGoon] = useState(false);

    const db = useContext(DB);
    const accounts = useStoreState(state => state.accounts)
    const contract = useStoreState(state => state.contract)

    async function getGoon() {
        const goonHash = await db.orbit.put({ ...goon, owner: accounts[0] });
        console.log("Goon was sent to IPFS", goonHash);
        const newGoonId = await contract._createPolygoon(goonHash, { from: accounts[0] });
        console.log('👑You are now the proud owner of: ', newGoonId, goonHash);
        setGotGoon(true);
    }

    return (
        <button disabled={!accounts.length || gotGoon} onClick={getGoon}>Get Goon</button>
    )
}

export default GetGoonButton;