import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionProvider({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        api.get('transactions')
        .then(resp => setTransactions(resp.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const resp = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        const { transaction } = resp.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}
