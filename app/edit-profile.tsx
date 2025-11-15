import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
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
import { useProfile } from "../context/ProfileContext";
import { COLORS } from "../styles/colors";

export default function EditProfileScreen() {
    const router = useRouter();
    const { profile, updateProfile } = useProfile();
    const [username, setUsername] = useState(profile.username);
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
    const [email, setEmail] = useState(profile.email);
    const [gender, setGender] = useState(profile.gender);
    const [profileImage, setProfileImage] = useState(profile.profileImage);

    useEffect(() => {
        // Request permissions
        (async () => {
            if (Platform.OS !== "web") {
                const { status: cameraStatus } =
                    await ImagePicker.requestCameraPermissionsAsync();
                const { status: mediaStatus } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (
                    cameraStatus !== "granted" ||
                    mediaStatus !== "granted"
                ) {
                    Alert.alert(
                        "Permissions Required",
                        "Camera and media library permissions are required to change profile picture."
                    );
                }
            }
        })();
    }, []);

    const handleImagePicker = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: pickImageFromCamera,
                },
                {
                    text: "Gallery",
                    onPress: pickImageFromGallery,
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    const pickImageFromCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image from camera:", error);
            Alert.alert("Error", "Failed to pick image from camera");
        }
    };

    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image from gallery:", error);
            Alert.alert("Error", "Failed to pick image from gallery");
        }
    };

    const handleSave = () => {
        updateProfile({
            username,
            email,
            phoneNumber,
            gender,
            profileImage,
        });
        Alert.alert("Success", "Profile updated successfully", [
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
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <View style={styles.placeholder} />
                </View>

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Profile Picture */}
                    <View style={styles.profilePictureContainer}>
                        <Image
                            source={{
                                uri: profileImage,
                            }}
                            style={styles.profilePicture}
                        />
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={handleImagePicker}
                        >
                            <MaterialCommunityIcons
                                name="camera"
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputsContainer}>
                        {/* Username */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Username:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Name"
                                placeholderTextColor="#A9A9A9"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>

                        {/* Number Phone */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Number Phone:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Number Phone"
                                placeholderTextColor="#A9A9A9"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Email"
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

                    {/* Save Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
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
    profilePictureContainer: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 40,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: COLORS.background,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: "50%",
        marginRight: -55,
        backgroundColor: COLORS.background,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",
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
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: "#333",
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
        width: "100%",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

