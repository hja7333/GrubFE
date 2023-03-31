import axios from "axios";

export const getLocationDetails = (location) => {
  return axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyDbifXH9H07fHVrciISF08USUoW2Zg-oXo",
      },
    })
    .then(({ data: { results } }) => {
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

export const fetchAllItems = (token) => {
  return axios
    .get("https://grub-group-project.onrender.com/api/items", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      const { items } = data;
      return items;
    });
};
