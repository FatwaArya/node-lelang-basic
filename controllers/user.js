const db = require('./../db/lelang');
const { generateToken, hashPassword } = require('./../auth/auth');
const bcrypt = require('bcryptjs');

// const models = require('./../models/index');//important!!
const models = require('./../models');
//make controller for user using sequelize
const user = {
    getAll: async (req, res) => {
        try {
            const users = await models.User.findAll();
            res.send(users);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getById: async (req, res) => {
        try {
            const user = await models.User.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    insert: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;
            const hashedPassword = hashPassword(password);
            const user = await models.User.create({
                name,
                email,
                username,
                password: hashedPassword
            });
            res.send(user);
        } catch (err) {
            res.status(500).send(err.errors[0].message);

        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await models.User.findOne({
                where: {
                    username
                }
            });
            if (!user) {
                return res.status(404).send('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Wrong password');
            }
            const token = generateToken(user);
            res.send({ user, token });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    logout: async (req, res) => {
        try {

            res.send('logged out');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    update: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;
            const user = await models.User.update({
                name,
                email,
                username,
                password: hashPassword(password)
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const user = await models.User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    bid: async (req, res) => {
        try {

            const barang = await models.Item.findOne({
                where: {
                    id: req.params.id_barang
                }
            });
            if (!barang) {
                return res.status(404).send('Barang not found');
            }
            //check if user had enough money

            if (req.body.harga <= barang.harga) {
                return res.status(200).send('Not enough money');
            }


            //bidding item
            const item = await models.Item.update({
                harga: req.body.harga,
                id_user: req.user.user.id
            }, {
                where: {
                    id: req.params.id_barang
                },
                returning: true,
                plain: true

            })
            //findone item
            const item_new = await models.Item.findOne({
                where: {
                    id: req.params.id_barang
                }
            });
            //find user
            const user = await models.User.findOne({
                where: {
                    id: item_new.id_user
                }
            });
            let harga = item_new.dataValues.harga

            res.send("Bid Success, Highest Bidder is " + user.username + " with $" + harga + "!");



        } catch (err) {
            res.status(500).send(err.message)
        }

    }

}
module.exports = user;



