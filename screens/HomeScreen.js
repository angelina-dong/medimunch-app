import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomText from '../components/CustomText';
import alarmImg from '../assets/alarm.png';
import alarmOffImg from '../assets/alarmOff.png';
import timerImg from '../assets/timer.png';
import Modal from 'react-native-modal';
import { supabase } from '../supabase';
import DatePicker from 'react-datepicker';



export default function HomeScreen({ navigation }) {
    // const styles = StyleSheet.create({
    //     container: {
    //         flex: 10,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //     }
    // })
    // const [selectedValue, setSelectedValue] = useState("prednisone");
    const [pickerVisible, setPickerVisible] = useState(false);
    const [medicineAdderVisible, setMedicineAdderVisible] = useState(false);

    const [medicinePickerVisible, setMedicinePickerVisible] = useState(false);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const hrs = Array.from({ length: 24 }, (_, i) => i);
    const min = Array.from({ length: 60 }, (_, i) => i);
    const sec = Array.from({ length: 60 }, (_, i) => i);

    const [isOn, setIsOn] = useState(false);
    const [time, setTime] = useState(new Date());
    const [isTimerEnded, setIsTimerEnded] = useState(false);

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [medicineToAdd, setMedicineToAdd] = useState('');


    const [medicineData, setMedicineData] = useState([]);
    const [userMedicineData, setUserMedicineData] = useState([]);

    const [takeByData, setTakeByData] = useState('');

    // const userMedicineData = [
    //     {
    //         name: 'Prednisone', info: <CustomText>Prednisone is a synthetic corticosteroid similar to the hormone cortisol, produced naturally by the adrenal glands. Corticosteroids are often referred to as "steroids," but they are different from anabolic steroids, which are often used illegally by some athletes to build muscle mass.

    //             Prednisone is approved for use in dogs to treat allergic, immune-mediated, and inflammatory conditions. Prednisone is also used off-label to treat Addison's disease, lymphoma, and immune-mediated polyarthritis in dogs.

    //             It is available in both oral and injectable forms and can be compounded into a flavored liquid for easier administration.</CustomText>, pillsLeft: '8', dateRefill: '12/5/23', takeBy: '9:00 AM', notifications: false
    //     },
    //     {
    //         name: 'Carprofen', info: <CustomText>Carprofen is a non-steroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation in dogs. This drug is most commonly used to ease the pain and inflammation associated with conditions like arthritis, elbow dysplasia, and hip dysplasia. It may also be prescribed after a surgery, injury, or infection to reduce pain, inflammation, and fever.

    //             Pain from inflammation is facilitated by an enzyme called cyclooxygenase (COX). There are two forms of this enzyme: COX-1 and COX-2. Both facilitate pain and inflammation, but COX-2 is mainly found at sites with swelling. Carprofen is categorized as a selective COX-2 inhibitor, preserving COX-1 in a dog's body which is primarily known to maintain and protect the lining of the gastrointestinal tract. Some NSAIDs inhibit all COX, which is likely to cause stomach upset, ulcers, and bleeding. By inhibiting COX-2 but not COX-1, carprofen can relieve pain and inflammation with milder GI side effects, which is why carprofen and other COX-2 inhibiting NSAIDs are prescribed over other types of NSAIDs for certain dogs.</CustomText>, pillsLeft: '10', dateRefill: '12/8/23', takeBy: '10:00 AM',
    //             notifications: true
    //     },
    //     {
    //         name: 'Ketoconazole', info: <CustomText>Ketoconazole is a prescription medication used to treat certain fungal or yeast infections in animals including dogs, horses, birds, small mammals, reptiles, and rarely, cats.

    //             Susceptible fungal or yeast infections of the skin, eyes, or ears are often treated by ketoconazole, typically as an active ingredient in topical (for the skin) products such as a shampoo, wipe, spray, or eye or ear ointment. Ketoconazole is rarely used for body-wide (systemic) infections from organisms such as cryptococcus, valley fever (coccidioidomycosis), aspergillus, candidiasis, and blastomycosis because digestive side effects are common with this medication.</CustomText>, pillsLeft: '1', dateRefill: '12/1/23', takeBy: '6:00 PM',
    //             notifications: false
    //     },

    // ];

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
    //     { name: 'test', info: <CustomText>Test info</CustomText>, pillsLeft: 'test', dateRefill: 'test'}
    // ];
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
    useEffect(() => {
        fetchMedicineData();
        fetchUserMedicineData();
    }, []);

    useEffect(() => {
        let interval;

        if (seconds === 0 && minutes === 0 && hours === 0 && isOn) {
            setIsOn(false);
            setIsTimerEnded(true);
            clearInterval(interval);
            // () => resestTimer;
        } else if (seconds === 0 && minutes === 0 && hours > 0 && isOn) {
            setSeconds(59);
            setMinutes(59);
            setHours(prevHours => prevHours - 1)
        } else if (seconds === 0 && minutes > 0 && isOn) {
            setSeconds(59);
            setMinutes(prevMinutes => prevMinutes - 1)
        } else if (isOn && (seconds > 0 || minutes > 0 || hours > 0)) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval); clearInterval(timer);
        };
    }, [isOn, hours, minutes, seconds, isTimerEnded]);

    useEffect(() => {
        if (isTimerEnded) {
            Alert.alert('Your medicine is ready!');
        }
    }, [isTimerEnded]);


    const resetTimer = () => {
        setSeconds(0);
        setHours(0);
        setMinutes(0);
        setIsOn(false);
        setIsTimerEnded(false);
    }

    const startPause = () => {
        setIsOn(prevIsOn => !prevIsOn);
    }

    const showPicker = () => {
        setPickerVisible(true);
    }

    const hidePicker = () => {
        setPickerVisible(false);
        setIsTimerEnded(false);
    };

    const showMedicinePicker = () => {
        setMedicinePickerVisible(true);
    };

    const hideMedicinePicker = () => {
        setMedicinePickerVisible(false);
    };

    const showMedicineAdder = () => {
        setMedicineAdderVisible(true);
    }

    const hideMedicineAdder = () => {
        setMedicineAdderVisible(false);
    }


    const [medicineName, setMedicineName] = useState('');
    const [takeByTime, setTakeByTime] = useState(new Date());

    const handleAddMedicine = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase
                .from('UserMedicines')
                .upsert(
                    [
                        {
                            name: medicineToAdd,
                            takeBy: takeByData,
                        },
                    ],
                    { onConflict: ['name'] }
                );

            if (error) {
                console.error('Failed to add medicine:', error.message);
            } else {
                console.log('Medicine added successfully:', data);
            }

            setTakeByData('');

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <CustomText size={26} weight="bolder" color='black' style={{ fontSize: 30, fontWeight: 'bold', paddingTop: 20, paddingBottom: 10 }}>Welcome Back!</CustomText>
            <CustomText style={{ fontSize: 20, paddingBottom: 20 }}>It is currently {time.toLocaleTimeString()}</CustomText>
            <View style={{ alignItems: 'center', backgroundColor: '#f2ac73', padding: 20, borderRadius: 10 }}>
                <CustomText size={20} weight="bolder" color='#ff6c36' style={{ fontSize: 26, color: '#246495', padding: 10, borderRadius: 10 }}>MediMunch Timer</CustomText>
                <TouchableOpacity onPress={showPicker}>
                    <View style={{ flexDirection: 'row', backgroundColor: "white", margin: 10, borderRadius: 10 }}>
                        <Image source={timerImg} style={{ width: 35, height: 35, marginTop: 10, marginLeft: 10 }} />
                        <CustomText style={{ fontSize: 20, padding: 20 }}>{`${hours}hr(s) ${minutes}min ${seconds}s`}</CustomText>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Button title="Reset" onPress={resetTimer} />
                    <Button title={isOn ? 'Pause' : 'Start'} onPress={startPause} />
                </View>
                <Modal isVisible={pickerVisible} onBackdropPress={hidePicker} style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', height: 350, backgroundColor: "white", borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Picker
                                    selectedValue={hours}
                                    onValueChange={(itemValue) => setHours(itemValue)}
                                    style={{ width: 100 }}
                                >
                                    {hrs.map((hour) => (
                                        <Picker.Item key={hour} label={hour.toString()} value={hour} />
                                    ))}
                                </Picker>
                                <Text>Hours</Text>
                            </View>

                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Picker
                                    selectedValue={minutes}
                                    onValueChange={(itemValue) => setMinutes(itemValue)}
                                    style={{ width: 100 }}
                                >
                                    {min.map((minute) => (
                                        <Picker.Item key={minute} label={minute.toString()} value={minute} />
                                    ))}
                                </Picker>
                                <Text>Minutes</Text>
                            </View>

                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Picker
                                    selectedValue={seconds}
                                    onValueChange={(itemValue) => setSeconds(itemValue)}
                                    style={{ width: 100 }}
                                >
                                    {sec.map((second) => (
                                        <Picker.Item key={second} label={second.toString()} value={second} />
                                    ))}
                                </Picker>
                                <Text>Seconds</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={hidePicker} style={{ paddingTop: 15 }}>
                            <View style={{ backgroundColor: 'lightgreen', borderRadius: 10, padding: 20 }}>
                                <Text>Set Time</Text>
                            </View>
                        </TouchableOpacity>



                    </View>
                </Modal >

            </View >

            <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
                <TouchableOpacity onPress={() => { showMedicinePicker(); setSelectedMedicine(0); fetchUserMedicineData(); }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#e8c4e9', margin: 10, borderRadius: 10, padding: 10 }}>
                        <CustomText style={{ padding: 5, color: '#246495', fontSize: 26 }}>
                            {selectedMedicine != null ? userMedicineData[selectedMedicine].name : 'Select a Medicine'}
                        </CustomText>
                    </View>
                </TouchableOpacity>

                <Modal isVisible={medicinePickerVisible} onBackdropPress={hideMedicinePicker} style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', height: 400, backgroundColor: "white", borderRadius: 20 }}>
                        <CustomText style={{ padding: 20, fontSize: 26, paddingTop: 30, color: '#2d221b' }}>Select Your Medicine:</CustomText>

                        <Picker
                            selectedValue={selectedMedicine}
                            onValueChange={(itemValue) => setSelectedMedicine(itemValue)}
                            style={{ width: 300 }}
                        >

                            {userMedicineData.map((medicine, index) => (
                                <Picker.Item key={index} label={medicine.name} value={index} />
                            ))}
                        </Picker>


                        <TouchableOpacity onPress={() => { hideMedicinePicker(); }} style={{ paddingTop: 15 }}>
                            <View style={{ backgroundColor: 'lightgreen', borderRadius: 10, padding: 20 }}>
                                <CustomText>Done</CustomText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* <CustomText style={{ padding: 20, fontSize: 20, color: '#0DC817' }}>Taken: {userMedicineData[].name}</CustomText> */}

                {/* <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', marginRight: 20, marginLeft: 20}}> */}
                {selectedMedicine != null ? (
                    <View style={{ alignItems: 'center', padding: 20, backgroundColor: '#add8e6', borderRadius: 10 }}><CustomText style={{ color: 'black', padding: 10, fontSize: 26 }}>
                        Take By: {userMedicineData[selectedMedicine].takeBy}
                    </CustomText>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Image source={alarmImg} style={{ width: 35, height: 35 }} />
                            <CustomText size={15} weight="bold" color='#8FC1FF' style={{ fontSize: 25, color: '#0DC817', paddingLeft: 15 }}>Notifications On</CustomText>
                        </View>
                    </View>) : (<View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white', borderRadius: 10, marginLeft: 30, marginRight: 30 }}>
                        <CustomText style={{ textAlign: 'center', fontSize: 20 }}>Information about the medicine will appear here! To get started, please select one of your medicines above or add a new medicine below.
                        </CustomText>
                    </View>)}


            </View>
            <View style={{ padding: 20 }}>
                <TouchableOpacity onPress={showMedicineAdder} style={{ paddingTop: 15 }}>
                    <View style={{ backgroundColor: '#B9E2A7', borderRadius: 10, padding: 20 }}>
                        <Text>Click Here to Add a New Medicine</Text>
                    </View>
                </TouchableOpacity>

                <Modal isVisible={medicineAdderVisible} onBackdropPress={hideMedicineAdder} style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', height: 465, backgroundColor: "white", borderRadius: 20 }}>
                        <CustomText style={{ padding: 20, fontSize: 26, paddingTop: 30, paddingBottom: -10 }}>Select A New Medicine:</CustomText>

                        <Picker
                            selectedValue={medicineToAdd}
                            onValueChange={(itemValue) => setMedicineToAdd(itemValue)}
                            style={{ width: 300 }}
                        >
                            {medicineData.map((medicine, index) => (
                                <Picker.Item key={index} label={medicine.name} value={medicine.name} />
                            ))}
                        </Picker>

                        <CustomText style={{ fontSize: 20 }}>Enter time to take medicine:</CustomText>
                        <TextInput
                            placeholder='time to take medicine'
                            value={takeByData}
                            onChangeText={(text) => setTakeByData(text)}
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginTop: 10,
                                padding: 10,
                            }}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                            <TouchableOpacity onPress={(e) => { hideMedicineAdder(); }} style={{ paddingTop: 15 }}>
                                <View style={{ backgroundColor: '#ff7f7f', borderRadius: 10, padding: 20 }}>
                                    <CustomText>Cancel</CustomText>
                                </View>
                            </TouchableOpacity>
                            <CustomText style={{ padding: 10 }}></CustomText>
                            <TouchableOpacity onPress={(e) => { hideMedicineAdder(); handleAddMedicine(e); fetchUserMedicineData(); }} style={{ paddingTop: 15 }}>
                                <View style={{ backgroundColor: 'lightgreen', borderRadius: 10, padding: 20 }}>
                                    <CustomText>Add</CustomText>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>
        </View >
    );


}