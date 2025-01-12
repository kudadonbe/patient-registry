<script setup>
import { ref, onMounted, reactive } from 'vue';
import { apiURL } from '@/laravelAPI/env';
import PatientTable from "@/components/PatientTable.vue";
import Patientform from '@/components/Patientform.vue';

import axios from 'axios';

const patientFromDB = ref([]);

const patients_url = `${apiURL}patients`;

let islands = reactive([]);
let houses = ref([]);



onMounted(async () => {
    islands = await getIslands();
    patientFromDB.value = await getAllPatients();

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


const onIslandChanged = async () => {
    houses.value = await refreshHouses();
}


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
    let islandData;
    // console.log(fitarable);

    let selectedIslandObject = fitarable.filter(island => island.name.toLowerCase() === islandName.toLowerCase());
    // console.log(selectedIslandObject);

    if (selectedIslandObject.length > 0) {
        islandData = await getIsland(selectedIslandObject[0].id);
    }
    // console.log(houses);
    return islandData.addresses;

}


const getHouseById = (houses, id) => {

    console.log(houses);
    console.log(`House ID: ${id}`);

    let foundHouse = null;
    // const foundHouse = houses.find(house => house.id === id);
    return foundHouse ? foundHouse.house : null; // Return null if not found
}


const getAllPatients = async () => {
    let patients = [];
    try {
        const res = await axios.get(patients_url);
        patients = res.data;
        // console.log(patients.data);
        // patientFromDB.value = patients.data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    return patients.data

};










const onSelectedPatient = async (patient) => {
    selectedPatient.id = patient.id;
    selectedPatient.name = patient.name;
    selectedPatient.dob = patient.dob;
    selectedPatient.national_id = patient.national_id;
    selectedPatient.address.island = patient.address.island;
    selectedPatient.address.house = patient.address.house;
    selectedPatient.address.id = patient.address.id;
    houses.value = await refreshHouses()
    // console.log(houses);

    // console.log(patient);

};



const updatePatient = async (patient) => {

    // console.log(patient);

    //  {
    //     "id": 36,
    //     "name": "Ali Mahir",
    //     "dob": "2025-01-15",
    //     "national_id": "A096^55",
    //     "address": {
    //         "id": 17,
    //         "house": "Aavi",
    //         "island": "ADh. Efuru"
    //     }
    // }


    let updatedPatient = {
        name: patient.name,
        dob: patient.dob,
        national_id: patient.national_id,
        address_id: patient.address.id
    };



    // console.log(updatedPatient);


    try {

        const response = await axios.patch(`${patients_url}/${patient.id}`, updatedPatient, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // console.log(response);
        // patientFromDB.value = patientFromDB.value.filter((p) => p.id !== patient.id);



        const indexToUpdate = patientFromDB.value.findIndex(p => p.id === patient.id);
        if (indexToUpdate !== -1) {
            // console.log(patientFromDB.value[indexToUpdate]);


            const indexofHouse = houses.value.findIndex(address => address.id === selectedPatient.address.id);
            // console.log(indexofHouse);
            // console.log(houses.value[indexofHouse]);
            if (indexofHouse !== -1) {
                patientFromDB.value[indexToUpdate].address.house = houses.value[indexofHouse].house;
            }


            patientFromDB.value[indexToUpdate].name = selectedPatient.name;
            patientFromDB.value[indexToUpdate].dob = selectedPatient.dob;
            patientFromDB.value[indexToUpdate].national_id = selectedPatient.national_id;
            patientFromDB.value[indexToUpdate].address.id = selectedPatient.address.id;
            patientFromDB.value[indexToUpdate].address.island = selectedPatient.address.island;
        };

    } catch (error) {

        console.log(error);

    }
};





const addNewPatient = async (patient) => {
    console.log(patient);

    let newpatient = {
        id: '',
        name: patient.name,
        dob: patient.dob,
        national_id: patient.national_id,
        address_id: patient.address.id
    };
    // console.log(newpatient);




    try {
        // console.log(newpatient);
        const response = await axios.post(patients_url, newpatient, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        newpatient = await response.data
        // console.log(newpatient);
        // console.log(selectedPatient);
        // console.log(patientFromDB);

        const foundHouse = houses.value.find(house => house.id === patient.address.id);

        let addedPatient = {
            id: newpatient.id,
            name: newpatient.name,
            dob: newpatient.dob,
            national_id: newpatient.national_id,
            address: {
                id: newpatient.address_id,
                house: foundHouse.house,
                island: selectedPatient.address.island
            }
        };

        patientFromDB.value.push(addedPatient);
    } catch (error) {
        console.error('Error:', error);
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
    <div class="flex flex-1 justify-center">
        <div class="p-3">
            <PatientTable :patients="patientFromDB" @select="onSelectedPatient" />
        </div>
        <div
            class="h-[100vh] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400">
        </div>
        <div class="p-3">
            <Patientform :selectedPatient="selectedPatient" :houses="houses" :islands="islands"
                @islandChanged="onIslandChanged" @addPatient="addNewPatient" @deletePatient="deletePatient"
                @updatePatientInfo="updatePatient" />
        </div>

    </div>

</template>