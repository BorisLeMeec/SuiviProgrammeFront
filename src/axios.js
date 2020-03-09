import axios from 'axios';
const instance = axios.create({
    baseURL: '' // TODO mettre la bonne URL
});
export default instance;