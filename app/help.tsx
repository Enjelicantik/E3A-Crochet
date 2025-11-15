import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";

interface HelpItemProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
}

const HelpItem: React.FC<HelpItemProps> = ({
    icon,
    title,
    subtitle,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.helpItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.helpItemLeft}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color={COLORS.background}
                    />
                </View>
                <View style={styles.helpItemText}>
                    <Text style={styles.helpItemTitle}>{title}</Text>
                    <Text style={styles.helpItemSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#ccc"
            />
        </TouchableOpacity>
    );
};

export default function HelpScreen() {
    const router = useRouter();

    const handleContactUs = () => {
        Linking.openURL("mailto:support@crochetapp.com");
    };

    const handlePrivacyPolicy = () => {
        // Navigate to privacy policy screen or open URL
        console.log("Privacy Policy");
        // You can add navigation here
    };

    const handleTermsOfService = () => {
        // Navigate to terms of service screen or open URL
        console.log("Terms of Service");
        // You can add navigation here
    };

    const handleFAQ = () => {
        // Navigate to FAQ screen
        console.log("FAQ");
        // You can add navigation here
    };

    const handleReportIssue = () => {
        Linking.openURL("mailto:report@crochetapp.com?subject=Report Issue");
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
                <Text style={styles.headerTitle}>Help</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Heading */}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Help Center</Text>
                    <Text style={styles.subtitle}>
                        Get support and find answers to your questions
                    </Text>
                </View>

                {/* Help Items */}
                <View style={styles.helpContainer}>
                    <HelpItem
                        icon="help-circle-outline"
                        title="Frequently Asked Questions"
                        subtitle="Find answers to common questions"
                        onPress={handleFAQ}
                    />

                    <HelpItem
                        icon="email-outline"
                        title="Contact Us"
                        subtitle="Get in touch with our support team"
                        onPress={handleContactUs}
                    />

                    <HelpItem
                        icon="alert-circle-outline"
                        title="Report an Issue"
                        subtitle="Report bugs or problems you encountered"
                        onPress={handleReportIssue}
                    />

                    <View style={styles.sectionDivider} />

                    <HelpItem
                        icon="shield-check-outline"
                        title="Privacy Policy"
                        subtitle="Learn how we protect your data"
                        onPress={handlePrivacyPolicy}
                    />

                    <HelpItem
                        icon="file-document-outline"
                        title="Terms of Service"
                        subtitle="Read our terms and conditions"
                        onPress={handleTermsOfService}
                    />
                </View>

                {/* Contact Information */}
                <View style={styles.contactContainer}>
                    <Text style={styles.contactTitle}>Need More Help?</Text>
                    <View style={styles.contactInfo}>
                        <MaterialCommunityIcons
                            name="email"
                            size={20}
                            color={COLORS.background}
                        />
                        <Text style={styles.contactText}>
                            support@crochetapp.com
                        </Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <MaterialCommunityIcons
                            name="phone"
                            size={20}
                            color={COLORS.background}
                        />
                        <Text style={styles.contactText}>+62 123 456 7890</Text>
                    </View>
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
        lineHeight: 20,
    },
    helpContainer: {
        paddingHorizontal: 20,
    },
    helpItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    helpItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FFF0F5",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    helpItemText: {
        flex: 1,
    },
    helpItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    helpItemSubtitle: {
        fontSize: 13,
        color: "#666",
    },
    sectionDivider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 8,
    },
    contactContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: "#FFF0F5",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FFE0E6",
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.background,
        marginBottom: 12,
    },
    contactInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 10,
    },
    contactText: {
        fontSize: 14,
        color: "#333",
    },
});

