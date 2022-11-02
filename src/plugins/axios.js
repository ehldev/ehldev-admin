import axios from "axios"

let $http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "Authorization": "Bearer " + localStorage.getItem('ehldev-admin') },
});

export default $http;