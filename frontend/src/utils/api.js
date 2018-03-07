import axios from 'axios';

const testApi = {
  getAll: () => {
    return axios.get('http://localhost:3001/categories', {
      headers: { Authorization: 'whatever-you-want' }
    });
  }
};

export default testApi;
