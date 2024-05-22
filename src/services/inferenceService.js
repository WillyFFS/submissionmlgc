const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

 
async function predictClassification(model, image) {
    try{
        const buffer = Buffer.from(image); 
        const tensor = tf.node.decodeImage(buffer);
        const resizedTensor = tf.image.resizeNearestNeighbor(tensor, [224, 224]);
        const expandedTensor = resizedTensor.expandDims();
        const floatTensor = expandedTensor.toFloat();

        const prediction = model.predict(floatTensor); 
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        let  suggestion;
        const label = confidenceScore > 50 ? 'Cancer': 'Non-cancer';
    
        if(label ===  'Cancer') {
            suggestion="Segera periksa ke dokter!"
        }

        if(label ===  'Non-cancer') {
            suggestion= "Tetap hidup sehat"
        }

        return { label, suggestion };
    }
    catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }

}   

module.exports = predictClassification;