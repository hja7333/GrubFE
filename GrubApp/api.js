import axios from 'axios'; 

export const getLocationDetails = (location) => {
 return axios.
    get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {"address": location,"key":"AIzaSyA3BIQziq4pGTWfEbmYMIfe9-6RJXmhOjM"}
    }).then(({data: {results}}) => {
        return results[0].geometry.location
    })
}

export const createUser = (newUser) => {
    return axios.post("https://grub-group-project.onrender.com/api/users", newUser).then(({data}) => {
        return data.user;
    })
}

