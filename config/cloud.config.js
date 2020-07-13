require('dotenv').config();
module.exports = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDAPI_KEY,
    api_secret: process.env.CLOUDAPI_SECRET
}