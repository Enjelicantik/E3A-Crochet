import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function AccountScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [institusi, setInstitusi] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

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
                    <Text style={styles.headerTitle}>Account</Text>
                    <View style={styles.placeholder} />
                </View>

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Detail Account Heading */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Detail Account</Text>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputsContainer}>
                        {/* Username */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Username:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Student Name"
                                placeholderTextColor="#A9A9A9"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        {/* Institusi */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Institusi:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex: Nusaputra University"
                                placeholderTextColor="#A9A9A9"
                                value={institusi}
                                onChangeText={setInstitusi}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Email Address"
                                placeholderTextColor="#A9A9A9"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Gender */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Gender:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Man/Women"
                                placeholderTextColor="#A9A9A9"
                                value={gender}
                                onChangeText={setGender}
                            />
                        </View>
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
        paddingBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.background,
    },
    inputsContainer: {
        paddingHorizontal: 20,
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
    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: "#333",
    },
});

