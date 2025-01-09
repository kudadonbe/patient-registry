<script setup>
import { ref, onMounted, reactive } from 'vue';
import { apiURL } from '@/laravel-api/env';
import PatientTable from "@/components/PatientTable.vue";
import Patientform from '@/components/Patientform.vue';

const patientFromDB = ref([]);

const patients_url = `${apiURL}patients`;

// let islands = ref([]);
let islands = reactive([]);
let houses = ref([]);






const getIsland = async (island_id) => {
    const island_url = `${apiURL}islands/${island_id}`;
    const response = await fetch(island_url);
    if (!response.ok) { throw new Error("Network response was not ok")};

    const island = await response.json();
    return island.data;   
}


const getIslands = async () => {
    const islands_url = `${apiURL}islands`;
    const response = await fetch(islands_url);
    if (!response.ok) { throw new Error("Network response was not ok")};

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
    refreshHouses()
    
};



const updatePatient = async (patient) => {
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

    console.log(updatedPatient);
    
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

    console.log(newpatient);
 
};



const deletePatient = async (id) => {
console.log(id);

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
            <Patientform :selectedPatient="selectedPatient" :houses="houses" :islands="islands" @islandChanged="onIslandChanged" />
        </div>

    </div>

</template>