const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
    try{
        const tensor = tf.node
            .decode(image)
        .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const classes = ["Cancer", "Non-cancer"];

        const prediction = model.predict(tensor); 
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 

        let  suggestion;
    
        if(confidenceScore > 50 ) {
            suggestion="Segera periksa ke dokter!",
            label = 'Cancer'
        }
        if(confidenceScore <= 50) {
            suggestion= "Tetap hidup sehat",
            label = 'Non-cancer'
        }
    }
    catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }

}   

module.exports = predictClassification;