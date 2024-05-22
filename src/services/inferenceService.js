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

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];

        let  suggestion;
    
        if(prediction > 0.5 ) {
            suggestion="Segera periksa ke dokter!",
            label = 'Cancer'
        }
        if(prediction <= 0.5) {
            suggestion= "Tetap hidup sehat",
            label = 'Non-cancer'
        }
    }
    catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }

}   

module.exports = predictClassification;