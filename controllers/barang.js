const db = require('./../db/lelang');

//make controller for barang
const barang = {
    //get all barang
    getAll: (req, res) => {
        db.query('SELECT * FROM barang', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //get barang by id
    getById: (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM barang WHERE id = ', [req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //insert barang with 
    insert: (req, res) => {
        db.query('INSERT INTO barang SET ?', req.body, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //update barang
    update: (req, res) => {
        db.query('UPDATE barang SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //delete barang
    delete: (req, res) => {
        db.query('DELETE FROM barang WHERE id = ?', [req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }

}



//export controller
module.exports = barang;
