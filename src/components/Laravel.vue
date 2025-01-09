<script setup>
import { ref, onMounted, reactive } from 'vue';
import { apiURL } from '@/laravel-api/env';
import PatientTable from "@/components/PatientTable.vue";
import Patientform from '@/components/Patientform.vue';

import axios from 'axios';

const patientFromDB = ref([]);

const patients_url = `${apiURL}patients`;

// let islands = ref([]);
let islands = reactive([]);
let houses = ref([]);






const getIsland = async (island_id) => {
    const island_url = `${apiURL}islands/${island_id}`;
    const response = await fetch(island_url);
    if (!response.ok) { throw new Error("Network response was not ok") };

    const island = await response.json();
    return island.data;
}


const getIslands = async () => {
    const islands_url = `${apiURL}islands`;
    const response = await fetch(islands_url);
    if (!response.ok) { throw new Error("Network response was not ok") };

    const islands = await response.json();

    return islands.data;
}


const refreshHouses = async () => {

    if (!selectedPatient.address.island) {
        houses.value = [];
        console.log("no island selected");

        return;
    }

    let fitarable = islands;
    let islandWithAtoll = selectedPatient.address.island;
    let parts = islandWithAtoll.split(" ")
    let islandName = parts[1]?.trim() || "";
    // console.log(fitarable);

    let selectedIslandObject = fitarable.filter(island => island.name.toLowerCase() === islandName.toLowerCase());
    // console.log(selectedIslandObject);

    if (selectedIslandObject.length > 0) {
        const islandData = await getIsland(selectedIslandObject[0].id);
        houses.value = islandData.addresses;
    }

    // console.log(houses);

}













onMounted(async () => {
    islands = await getIslands();

    try {
        const response = await fetch(patients_url);
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        const patients = await response.json();
        patientFromDB.value = patients.data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    // console.log(patientFromDB);

});

const selectedPatient = reactive({
    id: '',
    name: '',
    dob: '',
    national_id: '',
    address: {
        id: '',
        house: '',
        island: ''
    }
});


const onIslandChanged = () => {
    refreshHouses();
}


const onSelectedPatient = (patient) => {
    selectedPatient.id = patient.id;
    selectedPatient.name = patient.name;
    selectedPatient.dob = patient.dob;
    selectedPatient.national_id = patient.national_id;
    selectedPatient.address.island = patient.address.island;
    selectedPatient.address.house = patient.address.house;
    selectedPatient.address.id = patient.address.id;
    refreshHouses()

};



const updatePatient = async (patient) => {



    let updatedPatient = {
        name: patient.name,
        dob: new Date(patient.dob).toLocaleDateString(),
        national_id: patient.national_id,
        island_id: ''
    };

    console.log(updatedPatient);

};

const addNewPatient = async (patient) => {
    let newpatient = {
        id: '',
        name: patient.name,
        dob: patient.dob,
        national_id: patient.national_id,
        address_id: patient.address.id
    };

    // console.log(newpatient);

    let err = false;
    try {
        // console.log(newpatient);

        const response = await axios.post(patients_url, newpatient, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        newpatient = await response.data
        console.log(newpatient);
        console.log(selectedPatient);
        console.log(patientFromDB);

        let addedPatient = {
            id: newpatient.id,
            name: newpatient.name,
            dob: newpatient.dob,
            national_id: newpatient.national_id,
            address: {
                id: newpatient.address_id,
                house: selectedPatient.address.house,
                island: selectedPatient.address.island
            }
        };


        patientFromDB.value.push(addedPatient);

    } catch (error) {
        console.error('Error:', error);
        err = true;

    };



};



const deletePatient = async (id) => {
    // console.log(id);

    try {
        await axios.delete(`${patients_url}/${id}`);
        // Handle successful deletion (e.g., remove item from local data)
        patientFromDB.value = patientFromDB.value.filter((patient) => patient.id !== id);

    } catch (error) {
        console.error('Error deleting data:', error);
    }
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
            <Patientform :selectedPatient="selectedPatient" :houses="houses" :islands="islands"
                @islandChanged="onIslandChanged" @addPatient="addNewPatient" @deletePatient="deletePatient" />
        </div>

    </div>

</template>