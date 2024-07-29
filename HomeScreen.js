import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";
import { auth } from "./firebaseConfig";

export default function HomeScreen({ navigation }) {
    const logout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Avatar.Icon size={64} icon="home" style={styles.avatar} />
            <Title style={styles.title}>Welcome to MedReminder</Title>
            <Paragraph style={styles.paragraph}>Manage your medication easily and never miss a dose.</Paragraph>

            <Card style={styles.card}>
                <Card.Content>
                    <Title>Features</Title>
                    <Paragraph>Manage your medications, view your profile, and more.</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('AddMedication')}>
                        Add Medication
                    </Button>
                    <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Profile')}>
                        Profile
                    </Button>
                </Card.Actions>
            </Card>

            <Button mode="outlined" style={styles.logoutButton} onPress={logout}>
                Logout
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        marginBottom: 20,
        backgroundColor: '#6200ee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        marginRight: 10,
    },
    logoutButton: {
        marginTop: 20,
        borderColor: '#6200ee',
    },
});
