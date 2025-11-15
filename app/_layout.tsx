// app/_layout.tsx

import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/auth";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { OrderProvider } from "../context/OrderContext";
import { ProfileProvider } from "../context/ProfileContext";
import { COLORS } from "../styles/colors";

function RootLayoutNav() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Jika sudah selesai loading, lakukan navigasi berdasarkan auth state
        if (!isLoading) {
            if (isAuthenticated) {
                // User sudah login, bawa ke home (tabs)
                router.replace("/(tabs)");
            } else {
                // User belum login, bawa ke welcome screen
                router.replace("/");
            }
        }
    }, [isAuthenticated, isLoading, router]);

    // Tampilkan loading screen saat app melakukan pengecekan token
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.background,
                }}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="cart" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="category/[id]" />
            <Stack.Screen name="product/[id]" />
            <Stack.Screen name="edit-profile" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProfileProvider>
                <CartProvider>
                    <FavoritesProvider>
                        <OrderProvider>
                            <RootLayoutNav />
                        </OrderProvider>
                    </FavoritesProvider>
                </CartProvider>
            </ProfileProvider>
        </AuthProvider>
    );
}
