import axios from "axios";
const base_url = 'http://localhost:8000/api/';

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};


export const getIslands  = async () => {
    let islands = [];
    let url = `${base_url}islands`;
    try {
        const res = await axios.get(url);
        islands = res.data.data;
        // console.log(patients.data);
        // patientFromDB.value = patients.data;
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }    
    return islands
};

export const getIsland = async (id) => {
    let island = [];
    let url = `${base_url}islands/${id}`;
    
    
    try {
        const res = await axios.get(url);
        island = res.data.data;
    } catch (error) {
        
    }
    return island
};



export const addHouse = async (data) => {

    let url = `${base_url}addresses`;
    
    let addedHouse = {
        id: '',
        house: '',
        island_id: ''
    };
    
    try {
        const res = await axios.post(url ,data, config) 
        
        // console.log(res.data.name);
        addedHouse.id = res.data.id;
        addedHouse.house = res.data.name;
        addedHouse.island_id = res.data.island_id;
        
    } catch (error) {
        console.log(error);
        
    }
    
    return addedHouse
}


export const updateHouse = async (id, data) => {
 
    // console.log(id);
    // console.log(data);
    
    
    let url = `${base_url}addresses/${id}`;
    const res = await axios.patch(url, data, config)
    return res.data
}


export const deleteHouse = async (id) => {
    let url = `${base_url}addresses/${id}`;
    const res = await axios.delete(url)
    return res.data
}

