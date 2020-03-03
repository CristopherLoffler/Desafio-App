import axios from 'axios';

function http() {
  try {
    axios.create({
      baseURL: 'http://localhost:8080/api/',
    });
  } catch (error) {
    console.log('Api call error');
    alert(error.message);
  }
}

export default http;
