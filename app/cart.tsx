import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/CartContext";
import { COLORS } from "../styles/colors";

export default function CartScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartItemCount,
    } = useCart();

    const handleQuantityChange = (id: string, newQuantity: number) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };

    const totalAmount = getCartTotal();
    const itemCount = getCartItemCount();

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>My Cart</Text>
                    <Text style={styles.headerSubtitle}>{itemCount} items</Text>
                </View>
                <View style={styles.placeholder} />
            </View>

            {/* Cart Items */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons
                            name="cart-off"
                            size={80}
                            color="#ddd"
                        />
                        <Text style={styles.emptyTitle}>Cart is Empty</Text>
                        <Text style={styles.emptyText}>
                            Add some products to your cart
                        </Text>
                    </View>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <CartItemCard
                                key={item.id}
                                {...item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </>
                )}

                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Bottom Total Bar */}
            {cartItems.length > 0 && (
                <View
                    style={[
                        styles.bottomBar,
                        { paddingBottom: insets.bottom + 15 },
                    ]}
                >
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>
                            Rp {totalAmount.toLocaleString("id-ID")}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => router.push("/checkout")}
                    >
                        <Text style={styles.checkoutText}>
                            Proceed to Checkout
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        width: 28,
    },
    headerContent: {
        flex: 1,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    headerSubtitle: {
        fontSize: 13,
        color: "#fff",
        opacity: 0.9,
        marginTop: 2,
    },
    placeholder: {
        width: 28,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 20,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#999",
        marginTop: 20,
    },
    emptyText: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 8,
        textAlign: "center",
    },
    bottomSpacer: {
        height: 100,
    },
    bottomBar: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 14,
        color: "#666",
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.background,
    },
    checkoutButton: {
        backgroundColor: COLORS.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        paddingVertical: 14,
        gap: 8,
    },
    checkoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
