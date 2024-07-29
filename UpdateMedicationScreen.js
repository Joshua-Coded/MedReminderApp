import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import { firestore } from "./firebaseConfig";

export default function UpdateMedicationScreen({ route, navigation }) {
    const { medication } = route.params;
    const [name, setName] = useState(medication.name);
    const [dosage, setDosage] = useState(medication.dosage);
    const [time, setTime] = useState(medication.time);

    const updateMedication = async () => {
        try {
            const medicationDoc = doc(firestore, 'medications', medication.id);
            await updateDoc(medicationDoc, { name, dosage, time });
            Alert.alert('Success', 'Medication updated successfully', [
                { text: 'OK', onPress: () => navigation.navigate('Profile') },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to update medication');
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Update Medication</Title>
                    <Paragraph>Update the details of your medication below.</Paragraph>
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
                    <Button mode="contained" onPress={updateMedication} style={styles.button}>
                        Update Medication
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
