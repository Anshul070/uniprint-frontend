import axios from 'axios';

const instace = axios.create({
    baseURL : "http://localhost:5000/"
});


export default instace;