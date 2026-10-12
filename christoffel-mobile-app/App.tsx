import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert,ScrollView,
} from 'react-native';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
};

export default function App() {
 const [screen, setScreen] = useState('home');
 const [dishName, setDishName] = useState('');
 const [description, setDescription] = useState('');
 const [course, setCourse] = useState('');
 const [price, setPrice] = useState('');
 const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  function saveItem() {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    const priceNumber = Number(price);

    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Invalid price', 'Enter a valid price greater than zero.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: priceNumber,
    };

    setMenuItems([...menuItems, newItem]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');

    Alert.alert('Success', 'Menu item added successfully!', [
      {
        text: 'OK',
        onPress: () => setScreen('menu'),
      },
    ]);
  }

  function renderHome() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CHRISTOFFEL'S MENU</Text>
          <Text style={styles.subtitle}>RESTAURANT MANAGEMENT</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome, Chef!</Text>
          <Text style={styles.title}>Manage Your Menu</Text>

          <Text style={styles.description}>
            Add new dishes and keep your restaurant menu organised.
          </Text>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setScreen('add')}
          >
            <Text style={styles.mainButtonText}>ADD MENU ITEM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setScreen('menu')}
          >
            <Text style={styles.buttonText}>VIEW MENU</Text>
          </TouchableOpacity>

         
        </View>
      </>
    );
  }

  function renderAddForm() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ADD MENU ITEM</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Enter dish name"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the dish"
            multiline
          />

          <Text style={styles.label}>Course</Text>

          {['Starter', 'Main Course', 'Dessert'].map((item) => (
            <TouchableOpacity
              key={item}
              style={course === item ? styles.selectedCourse : styles.button}
              onPress={() => setCourse(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.mainButton} onPress={saveItem}>
            <Text style={styles.mainButtonText}>SAVE ITEM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setScreen('home')}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  function renderMenu() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MENU ITEMS</Text>
        </View>

        <View style={styles.content}>
          {menuItems.length === 0 ? (
            <Text style={styles.emptyMessage}>
              No menu items have been added yet.
            </Text>
          ) : (
            menuItems.map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCourse}>{item.course}</Text>
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>
                <Text style={styles.itemPrice}>
                  R{item.price.toFixed(2)}
                </Text>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => setScreen('add')}
          >
            <Text style={styles.mainButtonText}>ADD ANOTHER ITEM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setScreen('home')}
          >
            <Text style={styles.buttonText}>BACK TO HOME</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#245B8F" barStyle="light-content" />

      <ScrollView>
        {screen === 'home' && renderHome()}
        {screen === 'add' && renderAddForm()}
        {screen === 'menu' && renderMenu()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  header: {
    backgroundColor: '#245B8F',
    padding: 25,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 11,
    color: '#D9E8F6',
    marginTop: 8,
    letterSpacing: 2,
  },

  content: {
    padding: 24,
  },
  welcome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#245B8F',
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 23,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#263746',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B8C2CC',
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  mainButton: {
    backgroundColor: '#245B8F',
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DFEA',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#245B8F',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedCourse: {
    backgroundColor: '#DCEAF7',
    borderWidth: 2,
    borderColor: '#245B8F',
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyMessage: {
    color: '#64748B',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 25,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DFEA',
    padding: 18,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  itemCourse: {
    color: '#245B8F',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    color: '#64748B',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#245B8F',
  },
});