import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { COLORS } from "../styles/colors";

interface PaymentMethod {
    id: string;
    name: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: "dana",
        name: "DANA",
        icon: "wallet",
        color: "#118EEA",
    },
    {
        id: "bank_transfer",
        name: "Bank Transfer",
        icon: "bank",
        color: "#1E88E5",
    },
    {
        id: "gopay",
        name: "GoPay",
        icon: "wallet-outline",
        color: "#00AA13",
    },
    {
        id: "ovo",
        name: "OVO",
        icon: "credit-card",
        color: "#4C2A86",
    },
    {
        id: "shopeepay",
        name: "ShopeePay",
        icon: "wallet-outline",
        color: "#EE4D2D",
    },
];

export default function CheckoutScreen() {
    const router = useRouter();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { addOrder } = useOrder();
    const [selectedPayment, setSelectedPayment] = useState<string>("");

    const subtotal = getCartTotal();
    const shippingFee = 15000;
    const total = subtotal + shippingFee;

    const handleCheckout = () => {
        if (!selectedPayment) {
            Alert.alert("Payment Method Required", "Please select a payment method");
            return;
        }

        if (cartItems.length === 0) {
            Alert.alert("Cart Empty", "Your cart is empty");
            return;
        }

        // Add order to order history
        const paymentMethodName =
            paymentMethods.find((pm) => pm.id === selectedPayment)?.name ||
            selectedPayment;

        addOrder({
            items: cartItems,
            total,
            status: "Completed",
            paymentMethod: paymentMethodName,
        });

        // Clear cart
        clearCart();

        // Show success alert
        Alert.alert(
            "Order Successful!",
            "Your order has been placed successfully",
            [
                {
                    text: "View Orders",
                    onPress: () => {
                        router.replace("/order-history");
                    },
                },
                {
                    text: "Continue Shopping",
                    onPress: () => {
                        router.replace("/(tabs)");
                    },
                },
            ]
        );
    };

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
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Order Items Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    <View style={styles.itemsContainer}>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.orderItem}>
                                <Image
                                    source={{ uri: item.imageUri }}
                                    style={styles.itemImage}
                                />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.itemQuantity}>
                                        Qty: {item.quantity}
                                    </Text>
                                </View>
                                <Text style={styles.itemPrice}>
                                    Rp{" "}
                                    {(item.price * item.quantity).toLocaleString(
                                        "id-ID"
                                    )}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethodsContainer}>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentMethodCard,
                                    selectedPayment === method.id &&
                                        styles.paymentMethodCardSelected,
                                ]}
                                onPress={() => setSelectedPayment(method.id)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.paymentIconContainer,
                                        { backgroundColor: `${method.color}15` },
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name={method.icon}
                                        size={24}
                                        color={method.color}
                                    />
                                </View>
                                <Text style={styles.paymentMethodName}>
                                    {method.name}
                                </Text>
                                {selectedPayment === method.id && (
                                    <View style={styles.checkIcon}>
                                        <MaterialCommunityIcons
                                            name="check-circle"
                                            size={24}
                                            color={COLORS.background}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Order Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>
                                Rp {subtotal.toLocaleString("id-ID")}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping Fee</Text>
                            <Text style={styles.summaryValue}>
                                Rp {shippingFee.toLocaleString("id-ID")}
                            </Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>
                                Rp {total.toLocaleString("id-ID")}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Checkout Button */}
            <View style={styles.bottomBar}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabelBottom}>Total Amount</Text>
                    <Text style={styles.totalAmountBottom}>
                        Rp {total.toLocaleString("id-ID")}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        !selectedPayment && styles.checkoutButtonDisabled,
                    ]}
                    onPress={handleCheckout}
                    disabled={!selectedPayment}
                >
                    <Text style={styles.checkoutButtonText}>Complete Payment</Text>
                    <MaterialCommunityIcons
                        name="arrow-right"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.background,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    placeholder: {
        width: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: 100,
    },
    section: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.background,
        marginBottom: 16,
    },
    itemsContainer: {
        gap: 12,
    },
    orderItem: {
        flexDirection: "row",
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#E0E0E0",
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    itemQuantity: {
        fontSize: 12,
        color: "#666",
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: COLORS.background,
    },
    paymentMethodsContainer: {
        gap: 12,
    },
    paymentMethodCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: "transparent",
    },
    paymentMethodCardSelected: {
        borderColor: COLORS.background,
        backgroundColor: "#FFF0F5",
    },
    paymentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    paymentMethodName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    checkIcon: {
        marginLeft: 8,
    },
    summaryContainer: {
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    totalRow: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        marginTop: 4,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.background,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.background,
    },
    bottomBar: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    totalInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    totalLabelBottom: {
        fontSize: 14,
        color: "#666",
    },
    totalAmountBottom: {
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
    checkoutButtonDisabled: {
        backgroundColor: "#ccc",
        opacity: 0.6,
    },
    checkoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

