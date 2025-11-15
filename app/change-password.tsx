import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSave = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New password and confirm password do not match");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }

        // Add your password change logic here
        console.log("Changing password...");
        Alert.alert("Success", "Password has been changed successfully", [
            {
                text: "OK",
                onPress: () => router.back(),
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
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
                    <Text style={styles.headerTitle}>Change Password</Text>
                    <View style={styles.placeholder} />
                </View>

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Heading */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Update Password</Text>
                        <Text style={styles.subtitle}>
                            Enter your current password and choose a new one
                        </Text>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputsContainer}>
                        {/* Current Password */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Current Password:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Current Password"
                                    placeholderTextColor="#A9A9A9"
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    secureTextEntry={!showCurrentPassword}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowCurrentPassword(!showCurrentPassword)
                                    }
                                    style={styles.eyeButton}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            showCurrentPassword
                                                ? "eye-off"
                                                : "eye"
                                        }
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* New Password */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>New Password:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter New Password"
                                    placeholderTextColor="#A9A9A9"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!showNewPassword}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    style={styles.eyeButton}
                                >
                                    <MaterialCommunityIcons
                                        name={showNewPassword ? "eye-off" : "eye"}
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Confirm New Password:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm New Password"
                                    placeholderTextColor="#A9A9A9"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    style={styles.eyeButton}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            showConfirmPassword
                                                ? "eye-off"
                                                : "eye"
                                        }
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Save Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardAvoidingView: {
        flex: 1,
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
        paddingBottom: 10,
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
        lineHeight: 20,
    },
    inputsContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.background,
        marginBottom: 8,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: "#333",
    },
    eyeButton: {
        padding: 5,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: COLORS.background,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

