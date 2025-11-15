import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Image,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import ProductGridCard from "../../components/ProductGridCard";
import { useCart } from "../../context/CartContext";
import { useProfile } from "../../context/ProfileContext";
import { fetchProducts, formatPrice, Product } from "../../lib/api";
import { COLORS } from "../../styles/colors";

export default function HomeScreen() {
    const router = useRouter();
    const scrollY = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [headerHeight, setHeaderHeight] = useState(0);
    const { getCartItemCount } = useCart();
    const { profile } = useProfile();
    const cartItemCount = getCartItemCount();
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setProducts(allProducts);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const matchedProducts: Product[] = [];
        const otherProducts: Product[] = [];

        allProducts.forEach((product) => {
            const productName = product.name.toLowerCase();
            if (productName.includes(query)) {
                // Check if it's an exact match or starts with query
                if (productName === query) {
                    matchedProducts.unshift(product); // Exact match at the very top
                } else if (productName.startsWith(query)) {
                    matchedProducts.push(product); // Starts with query
                } else {
                    matchedProducts.push(product); // Contains query
                }
            } else {
                otherProducts.push(product);
            }
        });

        // Sort matched products: exact match first, then starts with, then contains
        matchedProducts.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();

            // Exact match priority
            if (aName === query && bName !== query) return -1;
            if (bName === query && aName !== query) return 1;

            // Starts with priority
            if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
            if (bName.startsWith(query) && !aName.startsWith(query)) return 1;

            return 0;
        });

        setProducts([...matchedProducts, ...otherProducts]);
    }, [searchQuery, allProducts]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setAllProducts(data);
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToDetail = (productId: string) => {
        router.push(`/product/${productId}` as any);
    };

    const navigateToCart = () => {
        router.push("/cart" as any);
    };

    // Fungsi untuk mengukur tinggi header
    const onHeaderLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    };

    // Search bar akan sticky setelah scroll melewati header
    const STICKY_HEADER_HEIGHT = headerHeight;

    // Posisi awal searchbar dari header (setelah title)
    const INITIAL_SEARCH_POSITION = STICKY_HEADER_HEIGHT;

    const searchBarTranslateY = scrollY.interpolate({
        inputRange: [0, STICKY_HEADER_HEIGHT],
        outputRange: [INITIAL_SEARCH_POSITION, 0],
        extrapolate: "clamp",
    });

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            {/* Sticky Search Bar */}
            <Animated.View
                style={[
                    styles.stickySearchContainer,
                    {
                        top: insets.top,
                        transform: [{ translateY: searchBarTranslateY }],
                    },
                ]}
            >
                <View style={styles.searchBar}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={22}
                        color="#999"
                    />
                    <TextInput
                        placeholder="What kind of crochet do you like?"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </Animated.View>

            <Animated.ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                {/* Header */}
                <View style={styles.header} onLayout={onHeaderLayout}>
                    <View style={styles.headerTop}>
                        <View style={styles.userInfo}>
                            <Image
                                source={{
                                    uri: profile.profileImage,
                                }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.greeting}>
                                    {getGreeting()} 🌸
                                </Text>
                                <Text style={styles.userName}>
                                    {profile.username}!
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.basketIcon}
                            onPress={navigateToCart}
                        >
                            <MaterialCommunityIcons
                                name="cart-outline"
                                size={28}
                                color="#fff"
                            />
                            {cartItemCount > 0 && (
                                <View style={styles.cartBadge}>
                                    <Text style={styles.cartBadgeText}>
                                        {cartItemCount}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Find Your{"\n"}Crochet</Text>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="large"
                                color={COLORS.background}
                            />
                            <Text style={styles.loadingText}>
                                Loading products...
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.gridContainer}>
                            {products.map((product) => (
                                <View key={product.id} style={styles.gridItem}>
                                    <ProductGridCard
                                        id={product.id}
                                        name={product.name}
                                        imageUri={product.url_picture}
                                        likes={product.total_likes}
                                        price={formatPrice(
                                            product.price_rupiah
                                        )}
                                        onPress={() =>
                                            navigateToDetail(product.id)
                                        }
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    stickySearchContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
    },
    greeting: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    basketIcon: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 12,
        padding: 8,
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#fff",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    cartBadgeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLORS.background,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        lineHeight: 48,
    },
    searchBarSpacer: {
        height: 60,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 90,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%",
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 100,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
    },
});
