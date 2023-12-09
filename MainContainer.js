import React, { useState } from 'react';
import {StyleSheet, Modal, View, Text, Button, TouchableOpacity, Image, TextInput}  from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import MedicationScreen from './screens/MedicationScreen';
import CustomText from './components/CustomText';
import dogImg from './assets/dog.png';
import catImg from './assets/cat.png';
import pillImg from './assets/pill.png';
import logo from './assets/logo.png';
// import home from "./assets/home.svg"

const home = "Home";
const calendar = "Calendar";
const medication = "Medication Info";
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
      button: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      miniButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      image: {
        width: '100%',
        height: '25%',
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
      },
  });

export default function MainContainer(){
    const [modalVisible, setModalVisible] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [dogDetails, setDogDetails] = useState({
        name: '',
        breed: '',
        age: '1',
        weight: '',
    });
    const [medicines, setMedicines] = useState([]);

    const addMedicine = () => {
    setMedicines([...medicines, '']);
    };

    
    const handleInputChange = (field, value) => {
        setDogDetails({
        ...dogDetails,
        [field]: value,
        });
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };

    const renderModalContent = () => {
      switch(currentPage) {
        case 0:
          return (
            <>
            <Image source={logo} style={styles.image} />
                {/* <CustomText style={{fontSize:26, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: "center" }}>Welcome to Medimunch!</CustomText> */}
                <CustomText style={{padding: 20}}></CustomText>
                <View style={{padding: 15, backgroundColor: "#f6c59e", borderRadius: 20}}>
                <TouchableOpacity onPress={nextPage} style={{justifyContent: 'center'}}>
                <CustomText style={{fontSize:26, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10, alignItems: "center", color: "black"}}>Get Started</CustomText>
                </TouchableOpacity>
                </View>
            </>
          );
        case 1:
          return (
            <>
            <CustomText style={{fontSize:26, fontWeight: 'bold',marginTop: 40, alignItems: "center" }}>Enter your dog's details:</CustomText>
            <TouchableOpacity style={styles.button}>
                <Image source={dogImg} style={{height: "50%", width: "50%"}} />
            </TouchableOpacity>
            <CustomText style={{fontSize: 15, color: "#000000", padding: 5}}>Name</CustomText>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={dogDetails.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <CustomText style={{fontSize: 15, color: "#000000", padding: 5}}>Breed</CustomText>
            <TextInput
                style={styles.input}
                placeholder="Breed"
                value={dogDetails.breed}
                onChangeText={(value) => handleInputChange('breed', value)}
            />
            <CustomText style={{fontSize: 15, color: "#000000", padding: 5}}>Age</CustomText>
            <Picker
                selectedValue={dogDetails.age}
                style={{height: "30%", width: "50%"}}
                onValueChange={(value) => handleInputChange('age', value)}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((age) => (
                <Picker.Item key={age} label={String(age)} value={String(age)} />
                ))}
            </Picker>
            <CustomText style={{fontSize: 15, color: "#000000", padding: 5}}>Weight in lbs</CustomText>
            <TextInput
                style={styles.input}
                placeholder="Weight (lbs)"
                value={dogDetails.weight}
                onChangeText={(value) => handleInputChange('weight', value)}
            />
            <Button title="Next" onPress={nextPage} />
            </>
          );
        case 2:
          return (
            <>
              <CustomText>Final page content...</CustomText>
              <Button title="Got it!" onPress={closeModal} />
            </>
          );
        default:
          return null;
      }
    };
    
    return(
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    {renderModalContent()}
                </View>
            </Modal>
            <NavigationContainer>
                <Tab.Navigator
                initialRouteName={home}
                screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === home) {
                        iconName = focused ? 'home' : 'home-outline'
                        return <Ionicons name={iconName} size={size} color={color}/>
                    } else if (rn == medication) {
                        iconName = focused? 'pills' : 'pills'
                        return <Fontisto name={iconName} size={size} color={color}/>
                    } else if (rn === calendar) {
                        iconName = focused ? 'calendar' : 'calendar'
                        return <AntDesign name={iconName} size={size} color={color}/>
                    } 
                    
                    return <Ionicons name={iconName} size={size} color={color}/>;

                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70}
                }}
                >
                <Tab.Screen name={home} component={HomeScreen}/>
                <Tab.Screen name={medication} component={MedicationScreen}/>
                <Tab.Screen name={calendar} component={CalendarScreen}/>



                </Tab.Navigator>
            </NavigationContainer>

        </>
    )
}