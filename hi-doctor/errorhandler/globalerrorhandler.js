module.exports = (err, req, res, next) => {
    return res.json({ err: err, statuscode:500})
}