<script setup>
import { ref, onMounted, reactive } from 'vue';

import { db } from '@/firebase';
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";

import PatientTable from "../components/PatientTable.vue";
import PForm from "../components/PForm.vue";

const patientCollection = collection(db, 'nics');
const patientFromDB = ref([]);

onMounted(async () => {
    onSnapshot(patientCollection, (querySnapshot) => {
        let patientsColl = [];
        querySnapshot.forEach((doc) => {
            // patients.push(doc.data().name.en);
            let fetchPatient = {
                id: doc.id,
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
    id: '',
    name: '',
    dob: '',
    national_id: '',
    address: {
        house: '',
        island: ''
    }
});


const onSelectedPatient = (patient) => {
    selectedPatient.id = patient.id;
    selectedPatient.name = patient.name;
    selectedPatient.dob = patient.dob;
    selectedPatient.national_id = patient.national_id;
    selectedPatient.address.house = patient.address.house;
    selectedPatient.address.island = patient.address.island;
};



const updatePatient = async (patient) => {
    let patientRef = doc(patientCollection, patient.id);
    let updatedPatient = {
        name: {
            en: patient.name
        },
        dob: new Date(patient.dob),
        nid: patient.national_id,
        address: {
            houseName: {
                en: patient.address.house
            },
            islandName: {
                en: patient.address.island
            }
        }
    };
    await setDoc(patientRef, updatedPatient);
};



const addPatient = async (patient) => {
    let newpatient = {
        name: {
            en: patient.name
        },
        dob: new Date(patient.dob),
        nid: patient.national_id,
        address: {
            houseName: {
                en: patient.address.house
            },
            islandName: {
                en: patient.address.island
            }
        }
    };
    // console.log(newpatient);
    await addDoc(patientCollection, newpatient);
};



const deletePatient = async (id) => {
    let patientRef = doc(patientCollection, id);
    await deleteDoc(patientRef);
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
            <PForm :editPatient="selectedPatient" @updatePatient="updatePatient" @deletePatient="deletePatient" @addPatient="addPatient" />
        </div>
    </div>

</template>