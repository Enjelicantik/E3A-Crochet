// project-ppm/app/(auth)/ResetPasswordScreen.tsx

import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";

// Komponen yang sudah kita buat
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png"); // Pastikan path logo benar

const ResetPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Asumsi: Notifikasi bahwa link/kode telah dikirim adalah pesan di layar ini

    const handleSubmit = () => {
        if (!newPassword || !confirmPassword) {
            alert("Password fields cannot be empty.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }

        // Asumsi: Lakukan pemanggilan API untuk mengganti password di sini
        console.log("Password has been successfully reset.");

        // Jika sukses, arahkan ke layar sukses reset password (kita buat sederhana)
        router.replace("/(auth)/ResetSuccessScreen");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Logo */}
                    <Image source={LOGO_IMAGE} style={styles.logo} />

                    <Text style={styles.title}>Reset Password</Text>

                    {/* Pesan Notifikasi (Ganti dengan notifikasi email/sms) */}
                    <Text style={styles.subtitle}>
                        A verification link/code has been sent to your
                        registered contact. Please set your new password.
                    </Text>

                    {/* 1. Input Kata Sandi Baru */}
                    <InputField
                        label="New Password:"
                        placeholder="Enter New Password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.inputSpacing}
                    />

                    {/* 2. Input Konfirmasi Kata Sandi */}
                    <InputField
                        label="Confirm New Password:"
                        placeholder="Confirm New Password"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    {/* Tombol Submit */}
                    <Button
                        title="Reset Password"
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    container: {
        alignItems: "center",
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 10,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 40,
        lineHeight: 24,
    },
    inputSpacing: {
        marginBottom: 30,
    },
    submitButton: {
        marginTop: 40,
    },
});

export default ResetPasswordScreen;
