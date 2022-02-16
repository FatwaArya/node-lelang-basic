const db = require('./../db/lelang');

//make controller for user 
const user = {
    //get all user
    getAll: (req, res) => {
        db.query('SELECT * FROM user', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //get user by id
    getById: (req, res) => {
        db.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => {
            if (err) throw new Error("User not found");
            res.send(result);
        });
    },
    //insert user with
    insert: (req, res) => {
        db.query('INSERT INTO user SET ?', req.body, (err, result) => {
            if (err) throw err;
            res.send(
                {
                    message: 'User has been created with id of ' + result.insertId + '!',
                }
            );
        });
    },
    //update user
    update: (req, res) => {
        db.query('UPDATE user SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //delete user
    delete: (req, res) => {
        db.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    },
    //bid on barang
    bid: (req, res) => {
        //check if user id and id barang is valid
        db.query('SELECT * FROM user WHERE id = ?', [req.params.id_user], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.send({
                    message: 'User not found'
                })
            };
            db.query('SELECT * FROM barang WHERE id = ?', [req.params.id_barang], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    return res.send({
                        message: 'barang not found'
                    })
                };
            });
            db.query('SELECT * FROM barang WHERE id = ?', [req.params.id_barang], (err, result) => {
                if (err) throw err;

                if (result[0].harga > req.body.harga) {
                    return res.send({
                        message: 'User does not have enough money'
                    })
                } else {
                    db.query('UPDATE barang set harga = ? , id_user = ? where id = ?', [req.body.harga, req.params.id_user, req.params.id_barang], (err, result) => {
                        if (err) throw err;
                        res.send(
                            {
                                message: 'Bid Success with the highest holder is ' + req.params.id_user + ' and the price is ' + req.body.harga,
                            }
                        );
                    });
                }



            });
        });

        //check if user has enough harga to bid

    }
}



//export controller
module.exports = user;


        //validation and sanitazion
