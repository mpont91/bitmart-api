const { FuturesClientV2 } = require('bitmart-api');

  // This example shows how to call this bitmart API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "bitmart-api" for bitmart exchange
  // This bitmart API SDK is available on npm via "npm install bitmart-api"
  // ENDPOINT: contract/public/depth
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/bitmart-api/blob/master/src/FuturesClientV2.ts#L111

const client = new FuturesClientV2({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getFuturesContractDepth(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
