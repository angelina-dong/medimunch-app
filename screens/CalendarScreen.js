import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../supabase';




export default function CalendarScreen({ navigation }) {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  // const userMedicines = [
  //     { name: 'Prednisone', info: 'Information about Medicine1.', pillsLeft: '8', dateRefill: '12/5/23', dateStart: null, dateEnd: null, datesYes: [], datesNo: [],},
  //     { name: 'Medicine2', info: 'Information about Medicine2.', pillsLeft: '10', dateRefill: '12/8/23', dateStart: null, dateEnd: null, datesYes: [], datesNo: [], },
  //     { name: 'Medicine3', info: 'Information about Medicine3.', pillsLeft: '1', dateRefill: '12/1/23', dateStart: null, dateEnd: null, datesYes: [], datesNo: [], },
  // ];


  const [userMedicines, setUserMedicines] = useState([]);

  const fetchMedicineData = async () => {
    try {
      const { data, error } = await supabase.from('UserMedicines').select('*');
      console.log(data);
      console.log('error' + error);
      if (error) {
        throw error;
      }

      const processedData = data.map((medicine) => ({
        name: medicine.name,
        dateStart: medicine.dateStart,
        dateEnd: medicine.dateEnd,
        datesTaken: medicine.datesTaken,
        datesSkipped: medicine.datesSkipped,
      }));

      setUserMedicines(processedData);
    } catch (error) {
      console.error('Error fetching medicine data:', error.message);
    }
  };

  useEffect(() => {
    fetchMedicineData();
  }, []);



  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const dayOptions = ['start', 'end', 'yes', 'no', 'delete', 'cancel'];

  useEffect(() => {
    fetchMedicineData();
    const updateCalendar = async () => {
      if (selectedMedicine) {
        try {
          const transformedData = {
            [selectedMedicine.dateStart]: { color: 'green' },
            [selectedMedicine.dateEnd]: { color: 'red' },
            [selectedMedicine.datesSkipped]: { color: '#FFCCCB' },
            [selectedMedicine.datesTaken]: { color: 'lightgreen' },
          };
          setMarkedDates(transformedData);
        } catch (error) {
          console.error('Error updating calendar data:', error.message);
        }
      }
    };
    updateCalendar();
  }, [selectedMedicine]);

  const updateDatabase = async (field, value) => {
    try {
      const { data, error } = await supabase
        .from('UserMedicines')
        .update({ [field]: value })
        .eq('name', selectedMedicine.name);
      if (error) {
        throw error;
      }
      console.log('success: ', data);
    } catch (error) {
      console.error('error: ', error.message);
    }
    fetchMedicineData();
  };

  const updateDatabaseArray = async (field, value) => {
    try {
      const { data, error } = await supabase
        .from('UserMedicines')
        .update({
          [field]: Array.isArray(selectedMedicine[field])
            ? selectedMedicine[field].concat(value)
            : [value],
        })
        .eq('name', selectedMedicine.name);
      if (error) {
        throw error;
      }
      console.log('success: ', data);
      fetchMedicineData();

    } catch (error) {
      console.error('error: ', error.message);
    }

  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowOptions(true);
  };

  const executeOption = async (option) => {
    switch (option) {
      case 'start':
        fetchMedicineData();
        updateDateColor(selectedDate, 'green');
        await updateDatabase('dateStart', selectedDate);
        setShowOptions(false);
        break;
      case 'end':
        fetchMedicineData();
        updateDateColor(selectedDate, 'red');
        await updateDatabase('dateEnd', selectedDate);
        break;
      case 'yes':
        fetchMedicineData();
        updateDateColor(selectedDate, 'lightgreen');
        await updateDatabaseArray('datesTaken', selectedDate);
        break;
      case 'no':
        fetchMedicineData();
        updateDateColor(selectedDate, '#FFCCCB');
        await updateDatabaseArray('datesSkipped', selectedDate);
        break;
      case 'delete':
        fetchMedicineData();
        updateDateColor(selectedDate, 'white');
      case 'cancel':
        break;
      default:
        break;
    }    setShowOptions(false);
  };

  const updateDateColor = (date, color) => {
    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      [date]: { color },
    }));
  };

  const renderDayOptions = ({ item }) => (
    <TouchableOpacity onPress={() => executeOption(item)}>
      <View style={styles.optionButton}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const showPicker = () => {
    setPickerVisible(true);
  }

  const hidePicker = () => {
    setPickerVisible(false);
  }
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CustomText style={{ padding: 5 }}></CustomText>
      <View>
        <TouchableOpacity onPress={showPicker} style={{ justifyContent: 'center' }}>
          <View style={{ borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: '#f3be96' }}>
            <CustomText style={{ padding: 5, color: '#246495', fontSize: 30 }}>
              {selectedMedicine ? selectedMedicine.name : 'Select a Medicine'}
            </CustomText>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Picker
            selectedValue={selectedMedicine}
            onValueChange={(value) => { setSelectedMedicine(value); hidePicker(); }}
            style={{ display: isPickerVisible ? 'flex' : 'none', width: 200 }}
          >
            {userMedicines.map((medicine, index) => (
              <Picker.Item key={index} label={medicine.name} value={medicine} />
            ))}
          </Picker>
        </View>
      </View>
      <CustomText style={{ padding: 3 }}></CustomText>
      <View style={{ flexDirection: 'row', borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: '#B6BCBA' }}>
        <Ionicons name="square" color="#00CA20" />
        <CustomText>  start</CustomText>
        <CustomText>  </CustomText>
        <Ionicons name="square" color="red" />
        <CustomText>  end</CustomText>
        <CustomText>  </CustomText>
      </View>
      <CustomText style={{ padding: 0 }}></CustomText>
      <Calendar style={{ width: 300, height: 375 }}
        current={'2023-11-16'}
        markedDates={markedDates}
        markingType={'period'}
        onDayPress={onDayPress}
      />
      {showOptions &&
        <FlatList
          data={dayOptions}
          renderItem={renderDayOptions}
          horizontal />

      }
      <CustomText style={{ padding: 5 }}></CustomText>
      <View style={{ alignItems: 'center', padding: 10, paddingLeft: 50, paddingRight: 50, backgroundColor: '#DFD8FF', borderRadius: 20, borderWidth: 2, borderColor: 'black' }}>
        <CustomText style={{ padding: 0, fontSize: 20, textAlign: 'center' }}>Took Medicine?</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="square" color="#90EE90" />
            <CustomText>  yes</CustomText>
          </View>
          <CustomText>            </CustomText>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="square" color="#FFCCCB" />
            <CustomText>  no</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: '#add8e6',
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
});

