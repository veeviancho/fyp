//this file is used for setting up some type of connector which can be used to hit the backend

import axios from 'axios';

//have this file return a connector
export default () => {
    return axios.create({
        baseURL: `http://localhost:5000/` //axios object pointing to our backend URL
    })
}