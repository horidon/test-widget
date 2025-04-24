const buildSecretURL = (secretHash) => {
    return `htpp://localhost${process.env.PORT}/${secretHash}`
}

module.exports = {
    buildSecretURL
}