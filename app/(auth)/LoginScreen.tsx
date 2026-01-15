import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/colors";

// --- IMPORT FIREBASE ---
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";

const LOGO_IMAGE = require("../../assets/images/Logo Crochet.png");

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Validasi input sederhana
        if (email === "" || password === "") {
            Alert.alert("Error", "Email dan Password tidak boleh kosong.");
            return;
        }

        setLoading(true);
        try {
            // Proses Login ke Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Login Berhasil:", user.email);
            
            // Pindah ke halaman utama (Home) setelah berhasil login
            router.replace("/(tabs)"); 

        } catch (error: any) {
            console.error(error);
            let errorMessage = "Terjadi kesalahan saat login.";
            
            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Email atau Password salah!";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "Akun tidak ditemukan!";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Password salah!";
            }

            Alert.alert("Login Gagal", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Image source={LOGO_IMAGE} style={styles.logo} />

                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>Welcome back! Please login.</Text>

                        <View style={styles.form}>
                            <InputField
                                label="Email:"
                                placeholder="Enter Your Email"
                                icon="email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <InputField
                                label="Password:"
                                placeholder="Enter Your Password"
                                icon="lock"
                                isPassword={true}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <Button
                                title={loading ? "Logging in..." : "Login"}
                                onPress={handleLogin}
                                disabled={loading}
                                style={styles.loginButton}
                            />

                            <View style={styles.footer}>
                                <Text style={{color: '#fff'}}>Dont have an account?</Text>
                                <Text 
                                    style={styles.link} 
                                    onPress={() => router.push("/(auth)/RegisterScreen")}
                                >
                                    Register
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    keyboardAvoidingView: { flex: 1 },
    scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 30 },
    container: { alignItems: "center" },
    logo: { width: 100, height: 100, marginBottom: 20, tintColor: COLORS.primary },
    title: { fontSize: 32, fontWeight: "bold", color: COLORS.primary, marginBottom: 10 },
    subtitle: { fontSize: 16, color: "#fff", marginBottom: 30 },
    form: { width: "100%" },
    loginButton: { marginTop: 10 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
    link: { color: COLORS.primary, fontWeight: 'bold' }
});

export default LoginScreen;