import CustomText from '../components/CustomText';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {supabase} from '../supabase';




export default function MedicationScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicineData, setMedicineData] = useState([]);
    const [userMedicineData, setUserMedicineData] = useState([]);


    const handleButtonClick = (medicine) => {
        setCurrentPage(currentPage + 2);
        setSelectedMedicine(medicine);
    };

    // const medicineData = [
    //     {
    //         name: 'Prednisone', info: <CustomText>Prednisone is a synthetic corticosteroid similar to the hormone cortisol, produced naturally by the adrenal glands. Corticosteroids are often referred to as "steroids," but they are different from anabolic steroids, which are often used illegally by some athletes to build muscle mass.

    //             Prednisone is approved for use in dogs to treat allergic, immune-mediated, and inflammatory conditions. Prednisone is also used off-label to treat Addison's disease, lymphoma, and immune-mediated polyarthritis in dogs.

    //             It is available in both oral and injectable forms and can be compounded into a flavored liquid for easier administration.</CustomText>, pillsLeft: '8', dateRefill: '12/5/23'
    //     },
    //     {
    //         name: 'Carprofen', info: <CustomText>Carprofen is a non-steroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation in dogs. This drug is most commonly used to ease the pain and inflammation associated with conditions like arthritis, elbow dysplasia, and hip dysplasia. It may also be prescribed after a surgery, injury, or infection to reduce pain, inflammation, and fever.

    //             Pain from inflammation is facilitated by an enzyme called cyclooxygenase (COX). There are two forms of this enzyme: COX-1 and COX-2. Both facilitate pain and inflammation, but COX-2 is mainly found at sites with swelling. Carprofen is categorized as a selective COX-2 inhibitor, preserving COX-1 in a dog's body which is primarily known to maintain and protect the lining of the gastrointestinal tract. Some NSAIDs inhibit all COX, which is likely to cause stomach upset, ulcers, and bleeding. By inhibiting COX-2 but not COX-1, carprofen can relieve pain and inflammation with milder GI side effects, which is why carprofen and other COX-2 inhibiting NSAIDs are prescribed over other types of NSAIDs for certain dogs.</CustomText>, pillsLeft: '10', dateRefill: '12/8/23'
    //     },
    //     {
    //         name: 'Ketoconazole', info: <CustomText>Ketoconazole is a prescription medication used to treat certain fungal or yeast infections in animals including dogs, horses, birds, small mammals, reptiles, and rarely, cats.

    //             Susceptible fungal or yeast infections of the skin, eyes, or ears are often treated by ketoconazole, typically as an active ingredient in topical (for the skin) products such as a shampoo, wipe, spray, or eye or ear ointment. Ketoconazole is rarely used for body-wide (systemic) infections from organisms such as cryptococcus, valley fever (coccidioidomycosis), aspergillus, candidiasis, and blastomycosis because digestive side effects are common with this medication.</CustomText>, pillsLeft: '1', dateRefill: '12/1/23'
    //     },
    // ];

    // const userMedicineData = [
    //     {
    //         name: 'Prednisone', info: <CustomText>Prednisone is a synthetic corticosteroid similar to the hormone cortisol, produced naturally by the adrenal glands. Corticosteroids are often referred to as "steroids," but they are different from anabolic steroids, which are often used illegally by some athletes to build muscle mass.

    //             Prednisone is approved for use in dogs to treat allergic, immune-mediated, and inflammatory conditions. Prednisone is also used off-label to treat Addison's disease, lymphoma, and immune-mediated polyarthritis in dogs.

    //             It is available in both oral and injectable forms and can be compounded into a flavored liquid for easier administration.</CustomText>, pillsLeft: '8', dateRefill: '12/5/23'
    //     },
    //     {
    //         name: 'Carprofen', info: <CustomText>Carprofen is a non-steroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation in dogs. This drug is most commonly used to ease the pain and inflammation associated with conditions like arthritis, elbow dysplasia, and hip dysplasia. It may also be prescribed after a surgery, injury, or infection to reduce pain, inflammation, and fever.

    //             Pain from inflammation is facilitated by an enzyme called cyclooxygenase (COX). There are two forms of this enzyme: COX-1 and COX-2. Both facilitate pain and inflammation, but COX-2 is mainly found at sites with swelling. Carprofen is categorized as a selective COX-2 inhibitor, preserving COX-1 in a dog's body which is primarily known to maintain and protect the lining of the gastrointestinal tract. Some NSAIDs inhibit all COX, which is likely to cause stomach upset, ulcers, and bleeding. By inhibiting COX-2 but not COX-1, carprofen can relieve pain and inflammation with milder GI side effects, which is why carprofen and other COX-2 inhibiting NSAIDs are prescribed over other types of NSAIDs for certain dogs.</CustomText>, pillsLeft: '10', dateRefill: '12/8/23'
    //     },
    //     {
    //         name: 'Ketoconazole', info: <CustomText>Ketoconazole is a prescription medication used to treat certain fungal or yeast infections in animals including dogs, horses, birds, small mammals, reptiles, and rarely, cats.

    //             Susceptible fungal or yeast infections of the skin, eyes, or ears are often treated by ketoconazole, typically as an active ingredient in topical (for the skin) products such as a shampoo, wipe, spray, or eye or ear ointment. Ketoconazole is rarely used for body-wide (systemic) infections from organisms such as cryptococcus, valley fever (coccidioidomycosis), aspergillus, candidiasis, and blastomycosis because digestive side effects are common with this medication.</CustomText>, pillsLeft: '1', dateRefill: '12/1/23'
    //     },
      
    // ];


    useEffect(() => {
        const fetchMedicineData = async () => {
          try {
            const { data, error } = await supabase.from('Medicines').select('*');
            // console.log(data);
            console.log('error' + error);
            if (error) {
              throw error;
            }
            
            const processedData = data.map((medicine) => ({
              name: medicine.name,
              info: medicine.info,
              sideEffects: medicine.sideEffects,
              recipes: medicine.recipes,
            }));
    
            setMedicineData(processedData);
          } catch (error) {
            console.error('Error fetching medicine data:', error.message);
          }
        };

      const fetchUserMedicineData = async () => {
        try {
            const { data, error } = await supabase.from('UserMedicines').select('*');
            console.log(data);
            console.log('error' + error);
            if (error) {
                throw error;
            }
            const processedUserData = data.map((medicine) => ({
                name: medicine.name,
                takeBy: medicine.takeBy,
            }));
    
            setUserMedicineData(processedUserData);
          } catch (error) {
            console.error('Error fetching medicine data:', error.message);
          }
        };
        fetchMedicineData();
        fetchUserMedicineData();
      }, []); 
       
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const updateSuggestions = (inputValue) => {
        const filteredMedicines = medicineData.filter(medicine =>
            medicine.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSuggestions(filteredMedicines);
    };

    const selectMedicine = (medicine) => {
        setSelectedMedicine(medicine);
    };


    const findMedicine = (selectedMedicine) => {
        return medicineData.find(medicine => medicine.name === selectedMedicine.name)
    }

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => { selectMedicine(item); setSuggestions([]); setSearchText(item.name) }}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderMedicationInfo = () => {
        switch (currentPage) {
            case 0:
                return (
                    <>

                        <CustomText style={{ paddingTop: 40, fontSize: 30, alignSelf: 'center', paddingBottom: 40 }}>Medication Information</CustomText>
                        <View style={{flex: 1}}>
                        <View style={{ alignItems: 'center' }}>
                            <CustomText style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignSelf: 'center', textAlign: 'center', marginRight: 30, marginLeft: 30, color: '#246495' }}>Enter in a medicine name to learn more:</CustomText>
                            <TextInput
                                style={styles.input}
                                placeholder="enter medicine here"
                                value={searchText}
                                onChangeText={(text) => {
                                    setSearchText(text);
                                    updateSuggestions(text);
                                }}
                            />
                            <FlatList
                                style={styles.suggestionsList}
                                data={suggestions}
                                renderItem={renderSuggestionItem}
                                keyExtractor={(item) => item.name}
                            />
                            <View style={{ padding: 5, backgroundColor: '#f3be96', borderRadius: 20, alignSelf: 'center', paddingLeft: 20, paddingRight: 20, }}>
                                <TouchableOpacity onPress={nextPage} style={{ justifyContent: 'center' }}>
                                    <CustomText style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: "center", color: "#246495" }}>Search</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomText></CustomText>
                        <View style={{ flex: 1, padding: 5, paddingBottom: 30,  alignItems: 'center'}}>
                            <CustomText style={{ padding: 20, fontSize: 26 }}>Your Medicines (Scroll): </CustomText>
                            <ScrollView style={{flex: 1, paddingBottom: 10, paddingTop: 35, backgroundColor: 'lightblue', borderRadius: 20, padding: 25}}>
                                {userMedicineData.map((medicine, index) => (
                                    <Button
                                        key={index}
                                        title={medicine.name}
                                        onPress={() => handleButtonClick(medicine)}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                        </View>
                    </>
                );
            case 1:
                return (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <CustomText style={{ color: 'black', fontSize: 30, padding: 20 }}>Medication Info</CustomText>
                        <View style={{ borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: '#f3be96' }}>
                            <CustomText style={{ padding: 5, color: '#246495', fontSize: 26, fontWeight: 'bold' }}>{selectedMedicine.name}</CustomText>
                        </View>
                        <CustomText style={{ padding: 10 }}></CustomText>
                        <View style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: 'lightblue', marginRight: 26, marginLeft: 26, borderRadius: 10 }}>
                        <ScrollView style={{ margin: 15, flex: 1 }}>
                            <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Description</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{selectedMedicine.info}</CustomText>
                                <CustomText></CustomText>

                                <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Side Effects</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{selectedMedicine.sideEffects}</CustomText>
                                <CustomText></CustomText>

                                <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Recipes</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{selectedMedicine.recipes}</CustomText>
                            </ScrollView>
                            <CustomText></CustomText>
                        </View>
                        <CustomText style={{ padding: 10 }}></CustomText>
                        <View style={{ padding: 10, backgroundColor: "#f3be96", borderRadius: 20 }}>
                            <TouchableOpacity onPress={() => { prevPage(); setSearchText('') }} style={{ justifyContent: 'center' }}>
                                <CustomText style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: "center", color: '#246495' }}>Back</CustomText>
                            </TouchableOpacity>
                        </View>
                        <CustomText></CustomText>
                    </View>);
            case 2:
                return (
                    <View style={{ flex: 1, alignItems: 'center', paddingBottom: 20 }}>
                        <CustomText style={{ color: 'black', fontSize: 30, padding: 20 }}>Medication Info</CustomText>
                        <View style={{ borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: '#f3be96' }}>
                            <CustomText style={{ padding: 5, color: '#246495', fontSize: 26, fontWeight: 'bold' }}>{
                            selectedMedicine.name}</CustomText>
                        </View>
                        <CustomText style={{ padding: 10 }}></CustomText>
                        <View style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: 'lightblue', marginRight: 26, marginLeft: 26, borderRadius: 10 }}>
                        <ScrollView style={{ margin: 15, flex: 1 }}>
                            <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Description</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{findMedicine(selectedMedicine).info}</CustomText>
                                <CustomText></CustomText>

                                <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Side Effects</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{findMedicine(selectedMedicine).sideEffects}</CustomText>
                                <CustomText></CustomText>

                                <CustomText style={{ fontWeight: 'bold', fontSize: 20 , textAlign: 'center'}}>Recipes</CustomText>
                            <CustomText></CustomText>
                            
                                <CustomText style={{ textAlign: 'center', color: 'gray' }}>{findMedicine(selectedMedicine).recipes}</CustomText>
                            </ScrollView>
                            <CustomText></CustomText>
                        </View>
                        <CustomText style={{ padding: 10 }}></CustomText>
                        <View style={{ padding: 10, backgroundColor: '#f3be96', borderRadius: 20 }}>
                            <TouchableOpacity onPress={() => { setCurrentPage(currentPage - 2); setSearchText('') }} style={{ justifyContent: 'center' }}>
                                <CustomText style={{ fontSize: 26, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: "center", color: '#246495' }}>Back</CustomText>
                            </TouchableOpacity>
                        </View>
                        <CustomText></CustomText>
                    </View>);
            default:
                return null;
        }
    };
    return (

        renderMedicationInfo()
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginTop: 20,
        height: 60,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 8,
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    suggestionsList: {
        maxHeight: 150,
        marginBottom: 10,
        alignSelf: 'center',
        paddingBottom: 10,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    medicineInfoContainer: {
        marginTop: 20,
    },
});
