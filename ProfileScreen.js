import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import { auth, firestore } from "./firebaseConfig";

export default function ProfileScreen({ navigation }) {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const fetchMedications = async () => {
            const user = auth.currentUser;
            const q = query(collection(firestore, 'medications'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const meds = [];
            querySnapshot.forEach((doc) => {
                meds.push({ ...doc.data(), id: doc.id });
            });
            setMedications(meds);
        };

        fetchMedications();
    }, []);

    const removeMedication = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'medications', id));
            setMedications(medications.filter((med) => med.id !== id));
            Alert.alert('Success', 'Medication removed successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to remove medication');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title>{item.name}</Title>
                            <Paragraph>Dosage: {item.dosage}</Paragraph>
                            <Paragraph>Time: {item.time}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => navigation.navigate('UpdateMedication', { medication: item })} style={styles.button}>
                                Update
                            </Button>
                            <Button mode="contained" onPress={() => removeMedication(item.id)} style={styles.button}>
                                Remove
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
    },
    button: {
        marginRight: 8,
    },
});
