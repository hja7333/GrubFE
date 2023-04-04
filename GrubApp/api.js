import axios from "axios";
const {GOOGLE_API_KEY} = require("./googleMapsAPIkey")

export const getLocationDetails = (location) => {
  return axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: GOOGLE_API_KEY,
      },
    })
    .then(({data: { results } }) => {
      return results[0].geometry.location;
    });
};

export const createUser = (newUser) => {
  return axios
    .post("https://grub-group-project.onrender.com/api/users", newUser)
    .then(({ data }) => {
      return data.user;
    });
};

export const getUser = (user) => {
  return axios
    .get(
      `https://grub-group-project.onrender.com/api/users/${user.user.username}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    .then(({ data }) => {
      const { user } = data;
      return user;
    });
};

export const fetchLocalItems = (token, lat, long) => {
  return axios
    .get(`https://grub-group-project.onrender.com/api/items/${lat}/${long}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      return data.items;
    });
};