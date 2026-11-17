import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized. Please login again.' })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        if (!req.body) {
            req.body = {}
        }
        req.body.docId = token_decode.id
        req.docId = token_decode.id
        next()
    } catch (error) {
        console.error("Doctor auth error:", error.message)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;
