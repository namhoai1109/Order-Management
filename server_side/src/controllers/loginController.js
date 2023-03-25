const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const config = require('../configs');
const {comparePassword} = require('../utils/passwordUtil');

exports.login = async (req, res) => {
    try {
        await prisma.$transaction(async (tx) => {
            const account = await tx.account.findUnique({
                where: {
                    username: req.body.username
                }
            });
            // if account doesn't exist
            if (!account) {
                res.status(401).send({message: 'Invalid username or password'})
            }

            // if password doesn't match
            const storedPassword = account.password;
            const isMatch = await comparePassword(req.body.password, storedPassword);
            if (!isMatch) {
                res.status(401).send({message: 'Invalid username or password'});
            }

            // if account is inactive
            if (account.status === "inactive") {
                res.status(401).send({message: 'Account is inactive'});
            }

            // if everything checks out
            console.log(config.jwtToken)
            const token = jwt.sign({id: account.id}, config.jwtToken);
            res.status(200).send({
                token: token,
                username: account.username,
                role: account.role
            })
        })
        
    } catch(err) {
        console.log(err);
        res.status(401).send({message: err.message});
    }
}