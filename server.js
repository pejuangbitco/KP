const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const md5 = require('md5')
const app = express()

app.use(bodyParser.json())

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'openpoid',
    multipleStatements: true
})

mysqlConnection.connect( (error) => {
    if(!error)
        console.log('db terkoneksi')
    else
        console.log(error)
})

app.listen(3001, () => {
    console.log('sedang berjalan pada port 3001')
})

// lokasi SECTION
app.get('/API/lokasi', (req, res) => {
    mysqlConnection.query('SELECT * FROM lokasi', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/lokasi/:id_lokasi', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/lokasi/:id_lokasi', (req, res) => {
    mysqlConnection.query('DELETE FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/lokasi', (req, res) => {
    let lokasi = req.body     
    let sql = 'SET @id_lokasi = ?; SET @nama_lokasi = ?; SET @kota = ?; SET @provinsi = ?; \
    CALL lokasiAddorEdit(@id_lokasi, @nama_lokasi, @kota, @provinsi);'
    
    mysqlConnection.query(sql, [lokasi.id_lokasi, lokasi.nama_lokasi, lokasi.kota, lokasi.provinsi], (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else
            res.status(400).send('Bad request')    
    })
})

app.put('/API/lokasi', (req, res) => {
    let lokasi = req.body    
    let sql = 'SET @id_lokasi = ?; SET @nama_lokasi = ?; SET @kota = ?; SET @provinsi = ?; \
    CALL lokasiAddorEdit(@id_lokasi, @nama_lokasi, @kota, @provinsi);'
    
    mysqlConnection.query(sql, [lokasi.id_lokasi, lokasi.nama_lokasi, lokasi.kota, lokasi.provinsi], (error, result, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            res.status(400).send('Bad request')    
    })
})

// kategori SECTION
app.get('/API/kategori', (req, res) => {
    mysqlConnection.query('SELECT * FROM kategori', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/kategori/:id_kategori', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM kategori WHERE id_kategori = ?', [req.params.id_kategori],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/kategori/:id_kategori', (req, res) => {
    mysqlConnection.query('DELETE FROM kategori WHERE id_kategori = ?', [req.params.id_kategori], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})



app.post('/API/kategori', (req, res) => {
    let kategori = req.body     
    let sql = 'SET @id_kategori = ?; SET @nama_kategori = ?; \
    CALL kategoriAddorEdit(@id_kategori, @nama_kategori);'
    
    mysqlConnection.query(sql, [kategori.id_kategori, kategori.nama_kategori], (error, result, fields) => {
        if(!error)            
            rsend(res, 'Sukses insert data')    
        else
            //res.status(400).send('Bad request')
            res.status(400).send('Bad request')    
    })
})

app.put('/API/kategori', (req, res) => {
    let kategori = req.body    
    let sql = 'SET @id_kategori = ?; SET @nama_kategori = ?; \
    CALL kategoriAddorEdit(@id_kategori, @nama_kategori);'
    
    mysqlConnection.query(sql, [kategori.id_kategori, kategori.nama_kategori], (error, result, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            res.status(400).send('Bad request')    
    })
})



// lokasi SECTION
app.get('/API/lokasi', (req, res) => {
    mysqlConnection.query('SELECT * FROM lokasi', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/lokasi/:id_lokasi', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/lokasi/:id_lokasi', (req, res) => {
    mysqlConnection.query('DELETE FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/lokasi', (req, res) => {
    let lokasi = req.body     
    let sql = 'SET @id_lokasi = ?; SET @nama_lokasi = ?; SET @kota = ?; SET @provinsi = ?; \
    CALL lokasiAddorEdit(@id_lokasi, @nama_lokasi, @kota, @provinsi);'
    
    mysqlConnection.query(sql, [lokasi.id_lokasi, lokasi.nama_lokasi, lokasi.kota, lokasi.provinsi], (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else
            res.status(400).send('Bad request')    
    })
})

app.put('/API/lokasi', (req, res) => {
    let lokasi = req.body    
    let sql = 'SET @id_lokasi = ?; SET @nama_lokasi = ?; SET @kota = ?; SET @provinsi = ?; \
    CALL lokasiAddorEdit(@id_lokasi, @nama_lokasi, @kota, @provinsi);'
    
    mysqlConnection.query(sql, [lokasi.id_lokasi, lokasi.nama_lokasi, lokasi.kota, lokasi.provinsi], (error, result, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            res.status(400).send('Bad request')    
    })
})

// produk SECTION
app.get('/API/produk', (req, res) => {
    mysqlConnection.query('SELECT * FROM produk', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/produk/:id_produk', (req, res) => {
    //console.log(req.params)
    mysqlConnection.query('SELECT * FROM produk WHERE id_produk = ?', [req.params.id_produk],(error, result, fields) => {
        if(!error) {
            res.send(result)          
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/produk/:id_produk', (req, res) => {
    mysqlConnection.query('DELETE FROM produk WHERE id_produk = ?', [req.params.id_produk], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/produk', (req, res) => {
    let produk = req.body     
    let sql = 'SET @id_produk = ?; SET @nama_produk = ?; SET @updated_at = ?; SET @harga = ?; SET @kuota = ?; \
    SET @open = ?; SET @close = ?; SET @deskripsi_produk = ?; SET @admin_id_admin = ?; SET @seller_id_seller = ?; \
    SET @kategori_id_kategori = ?; CALL ProdukAddorEdit(@id_produk, @updated_at, @harga, @kuota, \
        @open, @close, @deskripsi_produk, @admin_id_admin, @seller_id_seller, @kategori_id_kategori,@nama_produk);'
    let fields_table = [produk.id_produk, produk.nama_produk, produk.updated_at, produk.harga, produk.kuota, 
        produk.open, produk.close, produk.deskripsi_produk, produk.admin_id_admin, 
        produk.seller_id_seller, produk.kategori_id_kategori] 
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error) {
            let imgs = produk.image_produk
            sql = 'INSERT INTO image_produk (image, produk_id_produk) VALUE (?,?)'
            produk.image_produk.forEach(img => {
                img = md5(img)
                mysqlConnection.query(sql, [img, result])
            })
            res.send('sukses insert new data')                  
        }                       
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }
            
    })    
})

app.put('/API/produk', (req, res) => {
    let produk = req.body     
    let sql = 'SET @id_produk = ?; SET @nama_produk = ?; SET @updated_at = ?; SET @harga = ?; SET @kuota = ?; \
    SET @open = ?; SET @close = ?; SET @deskripsi_produk = ?; SET @admin_id_admin = ?; SET @seller_id_seller = ?; \
    SET @kategori_id_kategori = ?; CALL ProdukAddorEdit(@id_produk, @updated_at, @harga, @kuota, \
        @open, @close, @deskripsi_produk, @admin_id_admin, @seller_id_seller, @kategori_id_kategori,@nama_produk);'
    let fields_table = [produk.id_produk, produk.nama_produk, produk.updated_at, produk.harga, produk.kuota, 
        produk.open, produk.close, produk.deskripsi_produk, produk.admin_id_admin, 
        produk.seller_id_seller, produk.kategori_id_kategori] 
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error) {
            sql = 'SELECT * FROM image_produk WHERE seller_id_seller=?'
            mysqlConnection.query(sql, [produk.seller])

            let imgs = produk.image_produk
            sql = 'INSERT INTO image_produk (image, produk_id_produk) VALUE (?,?)'
            imgs.forEach(img => {
                img = md5(img)
                mysqlConnection.query(sql, [img, result], (error) => {
                    if(!error)            
                        console.log(img)           
                    else
                        res.send(404)
                })
            })
            res.send('sukses insert new data')                  
        }                       
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }
            
    })    
})


// seller SECTION
app.get('/API/seller', (req, res) => {
    mysqlConnection.query('SELECT * FROM seller', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/seller/:id_seller', (req, res) => {    
    mysqlConnection.query('SELECT * FROM seller WHERE id_seller = ?', [req.params.id_seller],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/seller/:id_seller', (req, res) => {
    mysqlConnection.query('DELETE FROM seller WHERE id_seller = ?', [req.params.id_seller], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/seller', (req, res) => {
    let seller = req.body     
    let sql = 'SET @id_seller = ?; SET @nama_seller = ?; SET @deskripsi_seller = ?; SET @foto_seller = ?; \
    SET @lokasi_id_lokasi = ?; CALL sellerAddorEdit(@id_seller, @nama_seller, @deskripsi_seller, \
        @foto_seller, @lokasi_id_lokasi);'
    let fields_table = [seller.id_seller, seller.nama_seller, seller.deskripsi_seller, 
        seller.foto_seller, seller.lokasi_id_lokasi]
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.put('/API/seller', (req, res) => {
    let seller = req.body     
    let sql = 'SET @id_seller = ?; SET @nama_seller = ?; SET @deskripsi_seller = ?; SET @foto_seller = ?; \
    SET @lokasi_id_lokasi = ?; CALL sellerAddorEdit(@id_seller, @nama_seller, @deskripsi_seller, \
        @foto_seller, @lokasi_id_lokasi);'
    let fields_table = [seller.id_seller, seller.nama_seller, seller.deskripsi_seller, 
        seller.foto_seller, seller.lokasi_id_lokasi]
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error)            
            res.send('sukses update data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})


// admin SECTION
app.get('/API/admin', (req, res) => {
    mysqlConnection.query('SELECT * FROM admin', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/admin/:id_admin', (req, res) => {    
    mysqlConnection.query('SELECT * FROM admin WHERE id_admin = ?', [req.params.id_admin],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/admin/:id_admin', (req, res) => {
    mysqlConnection.query('DELETE FROM admin WHERE id_admin = ?', [req.params.id_admin], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/admin', (req, res) => {
    let admin = req.body     
    let sql = 'SET @id_admin = ?; SET @nama_admin = ?; SET @email_admin = ?; SET @password_admin = ?; SET @foto_admin = ?; \
    SET @role = ?; CALL adminAddorEdit(@id_admin, @nama_admin, @email_admin, @password_admin, \
        @foto_admin, @role);'
    let fields_table = [admin.id_admin, admin.nama_admin, admin.email_admin, admin.password_admin,
        admin.foto_admin, admin.role]
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.put('/API/admin', (req, res) => {
    let admin = req.body     
    let sql = 'SET @id_admin = ?; SET @nama_admin = ?; SET @email_admin = ?; SET @password_admin = ?; SET @foto_admin = ?; \
    SET @role = ?; CALL adminAddorEdit(@id_admin, @nama_admin, @email_admin, @password_admin, @foto_admin, @role);'
    let fields_table = [admin.id_admin, admin.nama_admin, admin.email_admin, admin.password_admin,
        admin.foto_admin, admin.role]
    mysqlConnection.query(sql, fields_table, (error, result, fields) => {
        if(!error)            
            res.send('sukses update data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})


