const QRCode = require('qrcode');
const formDataModel = require('./exitmodel');

async function generateQRCode(formDataId) {
    try {

        //const formData = await formDataModel.findById(formDataId);
        const formData="Hello";
        const formDataString = JSON.stringify(formData);
        const qrCodeDataURL = await QRCode.toDataURL(formDataString);
        return qrCodeDataURL;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}


const formDataId = '123';
generateQRCode(formDataId)
    .then((qrCodeDataURL) => {
        //console.log('QR Code Data URL:', qrCodeDataURL);
        })
    .catch((error) => {
        console.error('Error generating QR code:', error);
    });


    module.exports = generateQRCode;
    