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
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrder } from "../context/OrderContext";
import { COLORS } from "../styles/colors";

export default function OrderHistoryScreen() {
    const router = useRouter();
    const { orders } = useOrder();

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
                <Text style={styles.headerTitle}>Order History</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Heading */}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Your Orders</Text>
                    <Text style={styles.subtitle}>
                        View and track your past orders
                    </Text>
                </View>

                {/* Orders List */}
                <View style={styles.ordersContainer}>
                    {orders.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons
                                name="package-variant"
                                size={64}
                                color="#ccc"
                            />
                            <Text style={styles.emptyText}>No orders yet</Text>
                            <Text style={styles.emptySubtext}>
                                Your order history will appear here
                            </Text>
                        </View>
                    ) : (
                        orders.map((order) => {
                            const statusColor =
                                order.status === "Completed"
                                    ? "#4CAF50"
                                    : order.status === "Processing"
                                    ? "#FF9800"
                                    : "#F44336";
                            const itemCount = order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            );

                            return (
                                <TouchableOpacity
                                    key={order.id}
                                    style={styles.orderCard}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.orderHeader}>
                                        <View>
                                            <Text style={styles.orderId}>
                                                Order #{order.id}
                                            </Text>
                                            <Text style={styles.orderDate}>
                                                {order.date}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: statusColor },
                                            ]}
                                        >
                                            <Text style={styles.statusText}>
                                                {order.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.orderDetails}>
                                        <View style={styles.orderDetailRow}>
                                            <MaterialCommunityIcons
                                                name="package-variant"
                                                size={18}
                                                color={COLORS.background}
                                            />
                                            <Text style={styles.orderDetailText}>
                                                {itemCount} item
                                                {itemCount > 1 ? "s" : ""}
                                            </Text>
                                        </View>
                                        <View style={styles.orderDetailRow}>
                                            <MaterialCommunityIcons
                                                name="currency-usd"
                                                size={18}
                                                color={COLORS.background}
                                            />
                                            <Text style={styles.orderTotal}>
                                                Rp{" "}
                                                {order.total.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.orderFooter}>
                                        <View style={styles.paymentInfo}>
                                            <MaterialCommunityIcons
                                                name="credit-card"
                                                size={16}
                                                color="#666"
                                            />
                                            <Text style={styles.paymentText}>
                                                {order.paymentMethod}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.viewButton}
                                            onPress={() =>
                                                console.log("View order", order.id)
                                            }
                                        >
                                            <Text style={styles.viewButtonText}>
                                                View Details
                                            </Text>
                                            <MaterialCommunityIcons
                                                name="chevron-right"
                                                size={20}
                                                color={COLORS.background}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            </ScrollView>
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
        paddingBottom: 30,
    },
    headingContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.background,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
    },
    ordersContainer: {
        paddingHorizontal: 20,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
    },
    orderCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    orderId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 12,
        color: "#666",
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },
    orderDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    orderDetailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    orderDetailText: {
        fontSize: 14,
        color: "#666",
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.background,
    },
    orderFooter: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    paymentInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },
    paymentText: {
        fontSize: 12,
        color: "#666",
    },
    viewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    viewButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.background,
    },
});

