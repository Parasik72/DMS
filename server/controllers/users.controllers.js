const {User} = require('../models');

class Controller {
    // /api/users/ 'GET'
    async getUsers(req,res){
        try {
            const LIMIT = 10;
            const {sort} = req.query;
            if(!sort)
                return res.status(400).json({message: 'Users was not found.'});
            const user = req.user;
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const users = await User.find();
            if(sort === 'ALL')
                return res.status(200).json({userS: users});
            const userS = users.map(item => (item.firstname + ' ' + item.lastname  + ` (${item._id.toString()})` ).toLowerCase().includes(sort.toLowerCase()) && item).filter(item => item);
            while(userS.length > LIMIT)
                userS.pop();
            return res.status(200).json({userS});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Get users error.'});
        }
    }
}

module.exports = new Controller();