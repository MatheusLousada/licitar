import { createContext } from 'react';
import { User } from '../../types/User';
import { Auction } from '../../types/Auction';

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, username: string, email: string, password: string) => Promise<boolean>;
    getAuctions: () => Promise<Auction[]>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);