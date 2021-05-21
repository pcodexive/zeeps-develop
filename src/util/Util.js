import BaseUrl from "../components/services/axios-url";
const axios = require("axios");

const downloadFileByURL = (folder, file) => {
  axios({
    url: `${BaseUrl}/${folder}/${file}`,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
  });
}

export default {
  downloadFileByURL
};
