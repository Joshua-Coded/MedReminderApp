import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { auth } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Login</Title>
                    <Paragraph>Enter your email and password to login.</Paragraph>
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
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={loginUser} style={styles.button}>
                        Login
                    </Button>
                </Card.Actions>
                <Card.Content>
                    <Paragraph
                        style={styles.link}
                        onPress={() => navigation.navigate('Register')}
                    >
                        Don't have an account? Register
                    </Paragraph>
                </Card.Content>
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
    link: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
});
