import { createContext, useEffect, useState } from 'react'
import OrbitDB from 'orbit-db';
import IPFS from 'ipfs';

const ipfs = new IPFS({
    EXPERIMENTAL: {
        pubsub: true
    },
});

ipfs.on('error', (e) => console.error(e))

const OrbitContext = createContext();
export const OrbitContextProvider = ({ children }) => {

    const [orbit, setDBInstance] = useState();

    useEffect(() => {
        if (!orbit) {
            ipfs.on('ready', async () => {
                const orbitdb = await OrbitDB.createInstance(ipfs)
                const docstore = await orbitdb.docstore('polygoons.meta', { indexBy: 'owner' });
                setDBInstance(docstore);
            });
        }
    }, [])

    return (
        <OrbitContext.Provider value={{ orbit }}>
            {children}
        </OrbitContext.Provider>
    )
}

export default OrbitContext