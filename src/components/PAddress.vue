<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import { getIslands, getIsland, addHouse, updateHouse, deleteHouse } from '@/laravelAPI'


const islands = ref([]);
let islandWithHouses = ref([])
let houses = ref([]);
let selectedHouse = ref({
    id: '',
    house: '',
    island_id: ''
});



let houseName = ref('');
const selectedIslandID = ref();
const selectedHouseID = ref();

onMounted(async () => {
    islands.value = await getIslands();
    // console.log(islands);

});

const islandSelected = async () => {
    islandWithHouses.value = await getIsland(selectedIslandID.value);
    // console.log(islandWithHouses);    
    houses.value = await islandWithHouses.value.addresses;

};

const houseSelected = async () => {
    // console.log(selectedHouseID.value);
    let selectedID = selectedHouseID.value;

    selectedHouse.value = houses.value.find(house => (house.id === selectedID));
    // console.log(selectedHouse);
    houseName.value = selectedHouse.value.house;
}




const addNewHouse = async () => {
    let newHouse = {
        name: houseName.value,
        island_id: selectedIslandID.value
    };

    let addedHouse = await addHouse(newHouse);

    // console.log(addedHouse);
    houses.value.push(addedHouse);
    selectedHouseID.value = addedHouse.id;
}


const modifyHouse = async () => {
    let id = selectedHouseID.value
    let updatedHouse = {
        name: houseName.value
    };
    let updatedInfo = await updateHouse(id, updatedHouse);
    // console.log(updatedInfo.name);
    const indexToUpdate = houses.value.findIndex(address => address.id === id);
    // console.log(indexToUpdate);
    // console.log(houses.value);
    if (indexToUpdate !== -1) {
        houses.value[indexToUpdate].house = updatedInfo.name;
    }

}


const onDeleteHouse = async () => {
   let id = selectedHouseID.value;

    try {
        const res = await deleteHouse(id);
        console.log(res);
    } catch (error) {
        console.log(error.response);
        alert(`There are paitents belong to this Address. You can't Delete this address`);

    }

}

</script>


<template>
    <div class="flex flex-1 justify-center">
        <form>
            <div class="sm:col-span-3">
                <label for="island" class="block text-sm/6 font-medium text-gray-900">Island</label>
                <div class="mt-2 grid grid-cols-1">
                    <select id="island" name="island" autocomplete="island-name" v-model="selectedIslandID"
                        @change="islandSelected"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                        <option value="" disabled>Select an island</option>
                        <option v-for="island in islands" :key="island.id" :value="island.id">{{ `${island.atoll}
                            ${island.name}` }}
                        </option>
                    </select>
                    <ChevronDownIcon
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        aria-hidden="true" />
                </div>
            </div>
            <div class="sm:col-span-3 pt-3">
                <label for="house-name" class="block text-sm/6 font-medium text-gray-900">House</label>
                <div class="mt-2 grid grid-cols-1">
                    <select id="house" name="house" autocomplete="house-name" v-model="selectedHouseID"
                        @change="houseSelected"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                        <option v-for="address in houses" :key="address.id" :value="address.id">{{ address.house }}
                        </option>
                    </select>
                    <ChevronDownIcon
                        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        aria-hidden="true" />
                </div>
            </div>

            <div class="sm:col-span-3 pt-3">
                <label for="full-name" class="block text-sm/6 font-medium text-gray-900">House Name</label>
                <div class="mt-2">
                    <input type="text" name="full-name" id="full-name" autocomplete="full-name"
                        placeholder="Your full name" v-model="houseName"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                </div>
            </div>

            <div class="mt-6 flex items-center justify-center gap-x-6">
                <button type="button" @click="addNewHouse"
                    class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add</button>
                <button type="button" @click="modifyHouse"
                    class="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Update</button>
                <button type="button" @click="onDeleteHouse"
                    class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red
                -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete</button>
                <button type="button"
                    class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red
            -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Clear</button>
            </div>

        </form>
    </div>
</template>