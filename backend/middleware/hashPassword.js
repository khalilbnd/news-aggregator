import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
    try {
        if (req.body && req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next();
        } else {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
    } catch (error) {
        next(error);
    }
};



