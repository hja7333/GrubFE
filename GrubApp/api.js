import axios from 'axios'; 
import { UserContext } from './contexts/UserContext';
import React, { useContext } from "react";

export const getLocationDetails = (location) => {
 return axios.
    get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {"address": location,"key": "AIzaSyDbifXH9H07fHVrciISF08USUoW2Zg-oXo"}
    }).then(({data: {results}}) => {
        console.log(results[0].geometry.location)
        return results[0].geometry.location
    })
}

export const createUser = (newUser) => {
    return axios.post("https://grub-group-project.onrender.com/api/users", newUser).then(({data}) => {
        return data.user;
    })
}

export const getUser = (username) => {
    const { user } = useContext(UserContext);
    return axios.get(`https://grub-group-project.onrender.com/api/users/${username}`, {headers: {Authorization: `Bearer ${user.token}`}}).then((res) => {
        console.log(res)
    })
}

getUser("John34")