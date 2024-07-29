import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { auth, firestore } from "./firebaseConfig";

export default function AddMedicationScreen({ navigation }) {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        requestNotificationPermissions();
    }, []);

    const requestNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission not granted', 'You need to enable notifications to use this feature');
        }
    };

    const addMedication = async () => {
        try {
            const user = auth.currentUser;
            await addDoc(collection(firestore, 'medications'), {
                userId: user.uid,
                name,
                dosage,
                time,
            });
            schedulePushNotification(name, dosage, time);
            Alert.alert('Success', 'Medication added successfully', [
                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to add medication');
        }
    };

    const schedulePushNotification = async (medicationName, dosage, time) => {
        try {
            const [hour, minute] = time.split(':').map(Number);
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Medication Reminder',
                    body: `It's time to take your medication: ${medicationName} (${dosage})`,
                    data: { medicationName, dosage },
                },
                trigger: {
                    hour,
                    minute,
                    repeats: true,
                },
            });
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Add New Medication</Title>
                    <Paragraph>Enter the details of your medication below.</Paragraph>
                </Card.Content>
                <Card.Content>
                    <TextInput
                        label="Medication Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Dosage"
                        value={dosage}
                        onChangeText={(text) => setDosage(text)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Time (HH:MM)"
                        value={time}
                        onChangeText={(text) => setTime(text)}
                        style={styles.input}
                        mode="outlined"
                    />
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={addMedication} style={styles.button}>
                        Add Medication
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
