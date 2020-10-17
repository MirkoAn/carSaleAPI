const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const jwtToken = req.header('Authorization')
    if(!jwtToken) return res.status(401).send('Access denied, token not founded')

    try {
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_CAR_API)
        req.user = payload
        next()

    } catch(error){
        res.status(400).send('Access denied. Invalid token')
    }
}

module.exports = auth