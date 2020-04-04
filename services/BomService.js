const restService = require('./RestService');
const BOM_API = require('./API').BOM;

exports.upload = (baseUrl, apiKey, base64BomFile) => {
    return restService.postJson(baseUrl+BOM_API, apiKey, {})
},

exports.isBeingProcessed = (token) => {
  return restService.getJson(baseUrl+BOM_API, apiKey, {})
}
