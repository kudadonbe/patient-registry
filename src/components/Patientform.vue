<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/16/solid'


const { selectedPatient, houses, islands } = defineProps(['selectedPatient', 'houses', 'islands']);

const emit = defineEmits(['islandChanged']);



const updateAddress = () => {
    console.log('address updates');
    
};

const onIslandSelect = () => {
    emit('islandChanged')
};



</script>
<template>

    <form @submit.prevent="updateAddress">
        <div class="space-y-12 ">
            <div class="border-b border-green-900/10 pb-12">
                <div class="text-green-700 bg-green-50 dark:bg-green-700 dark:text-green-400 sm:rounded-lg">
                    <h2 class="text-base/7 font-semibold text-green-900 pl-3 pr-3">Patient Information</h2>
                    <p class="mt-1 text-sm/6 text-green-600 pl-3 pr-3">This information will be confidential.</p>
                </div>

                <div class="mt-3 grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-6 pl-3 pr-3">

                    <div class="sm:col-span-3">
                        <label for="national-id" class="block text-sm/6 font-medium text-gray-900">ID Card
                            Number</label>
                        <div class="mt-2">
                            <input type="text" name="national-id" id="national-id" autocomplete="national-id"
                                placeholder="AXXXXXX" v-model="selectedPatient.national_id"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="full-name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                        <div class="mt-2">
                            <input type="text" name="full-name" id="full-name" autocomplete="full-name"
                                placeholder="Your full name" v-model="selectedPatient.name"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="dob" class="block text-sm/6 font-medium text-gray-900">Date of Birth</label>
                        <div class="mt-2">
                            <input type="date" name="dob" id="dob" autocomplete="dob"
                                v-model="selectedPatient.dob"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="house-name" class="block text-sm/6 font-medium text-gray-900">House</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select id="house" name="house" autocomplete="house-name"
                                v-model="selectedPatient.address.house"
                                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                                <option value="" disabled>Select an house</option>
                                <option v-for="house in houses" :key="house.id" :value="house.house">{{ house.house }}
                                </option>
                            </select>
                            <ChevronDownIcon
                                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                aria-hidden="true" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="island" class="block text-sm/6 font-medium text-gray-900">Island</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select id="island" name="island" autocomplete="island-name" @change="onIslandSelect(selectedPatient.address.island)"
                                v-model="selectedPatient.address.island" 
                                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                                <option value="" disabled>Select an island</option>
                                <option v-for="island in islands" :key="island.id"
                                    :value="`${island.atoll} ${island.name}`">{{ `${island.atoll} ${island.name}` }}
                                </option>
                            </select>
                            <ChevronDownIcon
                                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit"
                class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add</button>
            <button type="button"
                class="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                >Update</button>
            <button type="button"
                class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >Delete</button>
            <button type="button" class="text-sm/6 font-semibold text-gray-900">Clear</button>
        </div>
    </form>

</template>