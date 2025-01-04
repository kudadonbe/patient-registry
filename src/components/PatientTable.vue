<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['select']);


const props = defineProps(['patients']);


const onPatientSelected = (patient) => {
    emit('select', patient);
};
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-green-500 dark:text-green-400">
            <thead class="text-xs text-green-700 uppercase bg-green-50 dark:bg-green-700 dark:text-green-400 px-3 py-3">
                <tr>
                    <th scope="col" class="px-3 py-3">Name</th>
                    <th scope="col" class="px-3 py-3">Date of Birth</th>
                    <th scope="col" class="px-3 py-3">National ID</th>
                    <th scope="col" class="px-3 py-3">Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient.national_id" @click="onPatientSelected(patient)" class="bg-white border-b dark:bg-green-800 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-600">
                    <th scope="row" class="px-3 py-3 font-medium text-green-900 whitespace-nowrap dark:text-white">{{ patient.name }}</th>
                    <td class="px-3 py-3">{{ patient.dob }}</td>
                    <td class="px-3 py-3">{{ patient.national_id }}</td>
                    <td class="px-3 py-3">{{ `${patient.address.house}, ${patient.address.island}` }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>