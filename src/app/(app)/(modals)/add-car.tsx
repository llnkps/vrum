// src/app/(app)/(modals)/add-car.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AddCarForm from "@/components/forms/AddCarForm";

export default function AddCarPage() {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        onPress={() => router.dismiss()}
        className="absolute top-12 left-4 z-10 p-2 bg-white/80 rounded-full shadow-sm"
      >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <AddCarForm />
    </>
  );
}