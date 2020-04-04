const axios = require('axios')

exports.postJson = (url, apiKey, bodyData) => {
  const headers = {headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Api-Key': apiKey
  }}

  return new Promise((resolve, reject) => {
            axios.post(url, bodyData, headers)
                 .then(response => {
                    const {data, status}  = response
                    let statusOK = status >= 200 && status < 300

                    resolve({"status":(statusOK?true:false), "data":data})
               }).catch(err => {
                    resolve({"status":false, "data":err});
               })
         })
},

exports.getJson = (url, apiKey, bodyData) => {
  const headers  = {headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Api-Key': apiKey
  }}

  return new Promise((resolve, reject) => {
      axios.get(url, bodyData, headers)
           .then(response => {
              const {data, status}  = response
              let statusOK = status>=200 && status<300

              resolve({"status":(statusOK?true:false), "data":data})
         }).catch(err => {
              resolve({"status":false, "data":err});
         })
   })
}
