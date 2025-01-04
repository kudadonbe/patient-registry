<!-- 
 make a card for one patient with the following fields:
 Name, Date of Birth (DOB), National ID, and Address.
 -->

<script setup>
import { ref, defineProps } from 'vue';


const props = defineProps(['patient']);





</script>

<template>
    <div class="flex items-center min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-green-900">{{ patient.national_id }}</p>
                <p class="text-sm/6 font-semibold text-green-900">{{ patient.name }}</p>
                <p class="mt-1 truncate text-xs/5 text-green-500">{{ patient.dob }}</p>
                <p class="mt-1 truncate text-xs/5 text-green-600">{{ `${patient.address.house},
                    ${patient.address.island}` }}</p>
            </div>

    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <button class="w-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
        </button>


    </div>

</template>