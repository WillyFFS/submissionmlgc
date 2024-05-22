const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
    const tensor = tf.node
        .decode(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();
}

module.exports = predictClassification;