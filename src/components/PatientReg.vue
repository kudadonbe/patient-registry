<script setup>
import { ref, onMounted } from 'vue';
import Patient from './Patient.vue';
import { db } from '@/firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";



const patients = ref(
    []);

onMounted(async () => {
    onSnapshot(collection(db, 'nics'), (querySnapshot) => {
        let patientsColl = [];
        querySnapshot.forEach((doc) => {
            // patients.push(doc.data().name.en);
            let fetchPatient = {
                name: doc.data().name.en,
                dob: new Date(doc.data().dob.seconds * 1000).toLocaleDateString(),
                national_id: doc.data().nid,
                address: {
                    house: doc.data().address.houseName.en,
                    island: doc.data().address.islandName.en
                }
            };

            patientsColl.push(fetchPatient);

        });
        patients.value = patientsColl;

    });
});
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <h1 class="text-green-900 font-bold">Patient Registory</h1>
        <div role="list" class="divide-y divide-gray-100">
            <div v-for="patient in patients" :key="patient.national_id"
                class="flex justify-between items-center gap-x-6 py-5">
                <Patient :patient="patient" />
            </div>
        </div>
    </div>
</template>