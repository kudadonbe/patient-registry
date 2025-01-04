<script setup>
import { ref, onMounted, reactive } from 'vue';

import { db } from '@/firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import PatientTable from "../components/PatientTable.vue";
import PForm from "../components/PForm.vue";

const patientFromDB = ref([]);

onMounted(async () => {
    onSnapshot(collection(db, 'nics'), (querySnapshot) => {
        let patientsColl = [];
        querySnapshot.forEach((doc) => {
            // patients.push(doc.data().name.en);
            let fetchPatient = {
                name: doc.data().name.en,
                dob: new Date(doc.data().dob.seconds * 1000).toISOString().split('T')[0],
                national_id: doc.data().nid,
                address: {
                    house: doc.data().address.houseName.en,
                    island: doc.data().address.islandName.en
                }
            };

            patientsColl.push(fetchPatient);

        });
        patientFromDB.value = patientsColl;

    });
});

const selectedPatient = reactive({
    name: '',
    dob: '',
    national_id: '',
    address: {
        house: '',
        island: ''
    }
});

const onSelectedPatient = (patient) => {
    selectedPatient.name = patient.name;
    selectedPatient.dob = patient.dob;
    selectedPatient.national_id = patient.national_id;
    selectedPatient.address.house = patient.address.house;
    selectedPatient.address.island = patient.address.island;
};

</script>

<template>

    <div class="flex flex-1">
        <div class="p-3">
            <PatientTable :patients="patientFromDB" @select="onSelectedPatient" />
        </div>
        <div
            class="h-[100vh] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400">
        </div>
        <div class="p-3">
            <PForm :editPatient="selectedPatient" />
        </div>
    </div>

</template>