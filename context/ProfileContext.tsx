import React, { createContext, ReactNode, useContext, useState } from "react";

export interface UserProfile {
    username: string;
    email: string;
    phoneNumber: string;
    gender: string;
    profileImage: string;
}

interface ProfileContextType {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
    username: "ENJELI",
    email: "enjeli062003@gmail.com",
    phoneNumber: "",
    gender: "",
    profileImage: "https://via.placeholder.com/80/4A5568/ffffff?Text=E",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...updates,
        }));
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                updateProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};

