import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { auth } from "./firebaseConfig";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Register</Title>
                    <Paragraph>Enter your email and create a password to register.</Paragraph>
                </Card.Content>
                <Card.Content>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry
                        style={styles.input}
                        mode="outlined"
                    />
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={registerUser} style={styles.button}>
                        Register
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        padding: 16,
        borderRadius: 8,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
});
