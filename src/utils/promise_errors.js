module.exports = prom => {
    return new Promise((resolve, reject) => {
        let error = null, data = null

        prom.then(data => resolve([error, data]))
            .catch(error => resolve([error, data]))
    })
}