const {User} = require('../models');

module.exports = (role) => {
    return async (req, res, next) => {
        if(req.method === 'OPTIONS')
            return next();
        try {
            const user = await User.findById(req.user.userId);
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            let bflag = false;
            user.roles.forEach(item => {
                if(item === role)
                    bflag = true;
            });
            if(!bflag)
                return res.status(403).json({message: 'No access rights.'});
            req.user = user;
            return next();
        } catch (error) {
            return res.status(403).json({message: 'No access rights.'});
        }
    }
}
