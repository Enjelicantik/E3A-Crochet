import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../firebaseConfig';
import { COLORS } from '../styles/colors';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleSaveProduct = async () => {
    // Validasi sederhana
    if (!name || !price || !desc) {
      Alert.alert("Error", "Semua bidang harus diisi!");
      return;
    }

    try {
    const productListRef = ref(db, 'products');
    const newProductRef = push(productListRef);

    await set(newProductRef, {
        productName: name,
        productPrice: Number(price),
        description: desc,
        createdAt: new Date().toISOString(),
    });
    Alert.alert("Berhasil", "Produk berhasil disimpan ke Realtime Database!");
} catch (error) {
      console.error(error);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Produk Crochet</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nama Produk:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Contoh: Topi Rajut Bayi" 
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Harga (Rp):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Contoh: 50000" 
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Deskripsi:</Text>
        <TextInput 
          style={[styles.input, { height: 100 }]} 
          placeholder="Jelaskan detail produk..." 
          multiline
          value={desc}
          onChangeText={setDesc}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveProduct}>
          <Text style={styles.buttonText}>Simpan ke Firebase</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.primary },
  form: { width: '100%' },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});