import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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
import ProfileMenuItem from "../../components/ProfileMenuItem";
import { useAuth } from "../../context/auth";
import { useProfile } from "../../context/ProfileContext";
import { COLORS } from "../../styles/colors";

export default function ProfileScreen() {
    const { signOut } = useAuth();
    const { profile } = useProfile();
    const router = useRouter();

    const handleMenuPress = (menu: string) => {
        console.log(`${menu} pressed`);
        if (menu === "Log Out") {
            Alert.alert(
                "Log Out",
                "Are you sure you want to log out?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Log Out",
                        style: "destructive",
                        onPress: () => {
                            signOut();
                            router.replace("/(auth)/LoginScreen");
                        },
                    },
                ],
                { cancelable: true }
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            {/* Profile Section in Header */}
            <View style={styles.profileSection}>
                <View style={styles.profileContent}>
                    <Image
                        source={{
                            uri: profile.profileImage,
                        }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile.username}</Text>
                        <Text style={styles.profileEmail}>{profile.email}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => router.push("/edit-profile")}
                    >
                        <MaterialCommunityIcons
                            name="pencil"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu List */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.menuContainer}>
                    <ProfileMenuItem
                        icon="account-outline"
                        title="Account"
                        subtitle="Privacy, security, change email or number"
                        onPress={() => router.push("/account")}
                    />
                    <ProfileMenuItem
                        icon="lock-outline"
                        title="Change Password"
                        subtitle="Change your password to secure your account"
                        onPress={() => router.push("/change-password")}
                    />
                    <ProfileMenuItem
                        icon="history"
                        title="Order History"
                        subtitle="View your past orders"
                        onPress={() => router.push("/order-history")}
                    />
                    <ProfileMenuItem
                        icon="help-circle-outline"
                        title="Help"
                        subtitle="Help center, contact us, privacy policy"
                        onPress={() => router.push("/help")}
                    />
                    <ProfileMenuItem
                        icon="logout"
                        title="Log Out"
                        subtitle="Sign out of your account"
                        onPress={() => handleMenuPress("Log Out")}
                        showChevron={false}
                    />
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
    profileSection: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#fff",
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 13,
        color: "#fff",
        opacity: 0.9,
    },
    editButton: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    menuContainer: {
        marginTop: 20,
    },
});
