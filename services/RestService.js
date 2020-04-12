/** RestService is a layer of isolation for the rest client
*  it makes life easier in case we want to replace axios with a different
* rest client like jquery, pure node http, ember data etc ..
*/
const axios = require('axios');
const config = require('../utils/Configurations').defaultConfigs;

applyDefauls = () => {
  axios.defaults.baseURL = config.baseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] =  'application/json';
  axios.defaults.headers.common['X-Api-Key'] = config.apiKey;
}

exports.post = (urlSuffix, bodyData) => {
  applyDefauls();

  return new Promise((resolve, reject) => {
            axios.post(urlSuffix, bodyData)
                 .then(response => {
                    const {data, status}  = response
                    resolve(data)
               }).catch(err => {
                    console.log(err);
               })
         });
},

exports.put = (urlSuffix, bodyData) => {
  applyDefauls();

  return new Promise((resolve, reject) => {
            axios.put(urlSuffix, bodyData)
                 .then(response => {
                    const {data, status}  = response
                    resolve(data)
               }).catch(err => {
                    console.log(err);
               })
         });
},

exports.delete = (urlSuffix, bodyData) => {
  applyDefauls();

  return new Promise((resolve, reject) => {
            axios.delete(urlSuffix, bodyData)
                 .then(response => {
                    const {data, status}  = response
                    resolve(data)
               }).catch(err => {
                    console.log(err);
               })
         });
},

exports.get = (urlSuffix, bodyData) => {
  applyDefauls();

  return new Promise((resolve, reject) => {
      axios.get(urlSuffix, bodyData)
           .then(response => {
              const {data, status}  = response
              resolve(data)
         }).catch(err => {
              console.log(err);
         });
   })
}
