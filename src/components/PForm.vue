<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">Patient Information</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">This information will be confidential.</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        
                        <div class="sm:col-span-3">
                            <label for="national-id" class="block text-sm/6 font-medium text-gray-900">ID Card number</label>
                            <div class="mt-2">
                                <input type="text" name="national-id" id="national-id" autocomplete="national-id" placeholder="A1X345X"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="full-name" class="block text-sm/6 font-medium text-gray-900">Full name</label>
                            <div class="mt-2">
                                <input type="text" name="full-name" id="full-name" autocomplete="full-name" placeholder="Ahmed Ali"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="house-name" class="block text-sm/6 font-medium text-gray-900">House name</label>
                            <div class="mt-2">
                                <input type="text" name="house-name" id="house-name" autocomplete="house-name" placeholder="Aadhaige"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="island" class="block text-sm/6 font-medium text-gray-900">Island</label>
                            <div class="mt-2 grid grid-cols-1">
                                <select id="island" name="island" autocomplete="island-name"
                                    class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                                    <option></option>
                                    <option>HDh. Makunudhoo</option>
                                    <option>HA. Kelaa</option>
                                    <option>S. Gan</option>
                                </select>
                                <ChevronDownIcon
                                    class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    aria-hidden="true" />
                            </div>
                        </div>
                        
                        <div class="sm:col-span-3">
                            <label for="dob" class="block text-sm/6 font-medium text-gray-900">Date of birth</label>
                            <div class="mt-2">
                                <input type="date" name="dob" id="dob" autocomplete="dob"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
                <button type="submit"
                    class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green
                    -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Save</button>
            </div>
        </form>
    </div>
</template>