import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"

const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
    return useContext(SocketContext);
}

type SocketProviderProps = {
    id: string,
    children: React.ReactNode
}

export function SocketProvider({ id, children }: SocketProviderProps) {

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(
			import.meta.env.VITE_SERVER_URL,
            { query: { id }}
        );
        setSocket(newSocket);

        return () => {
            newSocket.close();
        }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            { children }
        </SocketContext.Provider>
    )
}
