import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

import * as S from "./ProfileScreen.styles";

const ProfileScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.HeaderTitle>Profile</S.HeaderTitle>
          <S.SettingsButton>
            <Ionicons
              name="settings-outline"
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#333333"}
            />
          </S.SettingsButton>
        </S.Header>

        <S.ProfileSection>
          <S.ProfileImage
            source={{ uri: "https://github.com/alopes-dev.png" }}
          />
          <S.ProfileName>Alopes Dev</S.ProfileName>
          <S.ProfileEmail>alopes.dev@gmail.com</S.ProfileEmail>
          <S.EditProfileButton>
            <S.EditProfileText>Edit Profile</S.EditProfileText>
          </S.EditProfileButton>
        </S.ProfileSection>

        <ScrollView showsVerticalScrollIndicator={false}>
          <S.SectionTitle>Account</S.SectionTitle>
          <S.MenuCard>
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#6E5DE7">
                <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
              </S.MenuIconContainer>
              <S.MenuText>Connected Accounts</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#F5CF6E">
                <Ionicons name="card-outline" size={20} color="#FFFFFF" />
              </S.MenuIconContainer>
              <S.MenuText>Payment Methods</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#FF6B6B">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#FFFFFF"
                />
              </S.MenuIconContainer>
              <S.MenuText>Notifications</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
          </S.MenuCard>

          <S.SectionTitle>Preferences</S.SectionTitle>
          <S.MenuCard>
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#4CAF50">
                <Ionicons name="globe-outline" size={20} color="#FFFFFF" />
              </S.MenuIconContainer>
              <S.MenuText>Currency</S.MenuText>
              <S.CurrencyValue>USD</S.CurrencyValue>
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem onPress={toggleTheme}>
              <S.MenuIconContainer bgColor="#2196F3">
                <Ionicons
                  name={isDarkMode ? "moon" : "moon-outline"}
                  size={20}
                  color="#FFFFFF"
                />
              </S.MenuIconContainer>
              <S.MenuText>Dark Mode</S.MenuText>
              <Ionicons
                name={isDarkMode ? "toggle" : "toggle-outline"}
                size={28}
                color={isDarkMode ? "#8A7BFF" : "#9E9E9E"}
              />
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#9C27B0">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#FFFFFF"
                />
              </S.MenuIconContainer>
              <S.MenuText>Privacy</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
          </S.MenuCard>

          <S.SectionTitle>Other</S.SectionTitle>
          <S.MenuCard>
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#607D8B">
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#FFFFFF"
                />
              </S.MenuIconContainer>
              <S.MenuText>Help & Support</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#FF9800">
                <Ionicons name="star-outline" size={20} color="#FFFFFF" />
              </S.MenuIconContainer>
              <S.MenuText>Rate the App</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
            <S.Divider />
            <S.MenuItem>
              <S.MenuIconContainer bgColor="#F44336">
                <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              </S.MenuIconContainer>
              <S.MenuText>Log Out</S.MenuText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? "#AAAAAA" : "#9E9E9E"}
              />
            </S.MenuItem>
          </S.MenuCard>
        </ScrollView>
      </S.Container>
    </S.RootContainer>
  );
};

export default ProfileScreen;
