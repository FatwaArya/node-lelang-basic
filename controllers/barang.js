const db = require('./../db/lelang');
const models = require('./../models');

const item = {
    getAll: async (req, res) => {
        try {
            const items = await models.Item.findAll();
            res.send(items);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getById: async (req, res) => {
        try {
            const item = await models.Item.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.send(item);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    insert: async (req, res) => {
        try {
            const { nama_barang, description, harga, category } = req.body;
            const item = await models.Item.create({
                nama_barang,
                description,
                harga,
                category,

            });
            res.send(item);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    update: async (req, res) => {
        try {
            const { nama_barang, description, harga, category } = req.body;
            const item = await models.Item.update({
                nama_barang,
                description,
                harga,
                category,

            }, {
                where: {
                    id: req.params.id
                },
                returning: true,
                plain: true
            }
            );
            res.send(item);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    delete: async (req, res) => {
        try {
            const item = await models.Item.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send(item);
        } catch (err) {
            res.status(500).send();
        }
    }
}

//make controller for barang
// const barang = {
//     //get all barang
//     getAll: (req, res) => {
//         db.query('SELECT * FROM barang', (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     },
//     //get barang by id
//     getById: (req, res) => {
//         const id = req.params.id;
//         db.query('SELECT * FROM barang WHERE id = ', [req.params.id], (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     },
//     //insert barang with 
//     insert: (req, res) => {
//         db.query('INSERT INTO barang SET ?', req.body, (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     },
//     //update barang
//     update: (req, res) => {
//         db.query('UPDATE barang SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     },
//     //delete barang
//     delete: (req, res) => {
//         db.query('DELETE FROM barang WHERE id = ?', [req.params.id], (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         });
//     }





//export controller
module.exports = item;
