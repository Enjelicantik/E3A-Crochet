import React, { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "./CartContext";

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: "Completed" | "Processing" | "Cancelled";
    paymentMethod: string;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, "id" | "date">) => void;
    getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const addOrder = (orderData: Omit<Order, "id" | "date">) => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
            date: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
        };
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        return newOrder;
    };

    const getOrderById = (orderId: string) => {
        return orders.find((order) => order.id === orderId);
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                getOrderById,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};

