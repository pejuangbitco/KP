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
    database: 'opid',
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
    let sql = `CALL lokasiAddorEdit('${lokasi.id_lokasi}', '${lokasi.nama_lokasi}', '${lokasi.kota}', '${lokasi.provinsi}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.post('/API/lokasi', (req, res) => {
    let lokasi = req.body     
    let sql = `CALL lokasiAddorEdit('${lokasi.id_lokasi}', '${lokasi.nama_lokasi}', '${lokasi.kota}', '${lokasi.provinsi}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)            
            res.send('sukses update data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
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
    let sql = `CALL kategoriAddorEdit('${kategori.id_kategori}', '${kategori.nama_kategori}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)              
            res.send('Sukses insert new data')    
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.put('/API/kategori', (req, res) => {
    let kategori = req.body     
    let sql = `CALL kategoriAddorEdit('${kategori.id_kategori}', '${kategori.nama_kategori}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)              
            res.send('Sukses update data')    
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
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
    let lid = null;
    let sql = `CALL ProdukAddorEdit('${produk.id_produk}', '${produk.created_at}', '${produk.updated_at}', 
        '${produk.harga}', '${produk.kuota}', '${produk.open}', '${produk.close}', '${produk.nama_produk}',
        '${produk.deskripsi_produk}', '${produk.admin_id_admin}', '${produk.seller_id_seller}',
        '${produk.kategori_id_kategori}'); `

    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error) {
            //let imgs = produk.image_produk
            result.forEach(element => {
                if(element.constructor == Array) {
                    lid = element[0].id_produk                    
                }                    
            })
            
            sql = 'INSERT INTO image_produk (image, produk_id_produk) VALUE (?,?)'
            produk.image_produk.forEach(img => {
                img = md5(img)
                mysqlConnection.query(sql, [img, lid])
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
    let sql = `CALL ProdukAddorEdit('${produk.id_produk}', '${produk.created_at}', '${produk.updated_at}', 
        '${produk.harga}', '${produk.kuota}', '${produk.open}', '${produk.close}', '${produk.nama_produk}',
        '${produk.deskripsi_produk}', '${produk.admin_id_admin}', '${produk.seller_id_seller}',
        '${produk.kategori_id_kategori}'); `

    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error) {            
            sql = `DELETE FROM image_produk where produk_id_produk = '${produk.id_produk}'`            
            mysqlConnection.query(sql)

            sql = 'INSERT INTO image_produk (image, produk_id_produk) VALUE (?,?)'
            produk.image_produk.forEach(img => {
                img = md5(img)
                mysqlConnection.query(sql, [img, produk.id_produk])
            })
            res.send('sukses update data')                  
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
    let sql = `CALL sellerAddorEdit('${seller.id_seller}','${seller.nama_seller}','${seller.deskripsi_seller}',
    '${md5(seller.foto_seller)}','${seller.lokasi_id_lokasi}');`

    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)            
            res.send('sukses insert new data')            
        else {
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.put('/API/seller', (req, res) => {
    let seller = req.body     
    let sql = `CALL sellerAddorEdit('${seller.id_seller}','${seller.nama_seller}','${seller.deskripsi_seller}',
    '${md5(seller.foto_seller)}','${seller.lokasi_id_lokasi}');`

    mysqlConnection.query(sql, (error, result, fields) => {
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
    mysqlConnection.query('SELECT * FROM admin_opid', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            res.status(400).send('Bad request')    
    })
})

app.get('/API/admin/:id_admin', (req, res) => {    
    mysqlConnection.query('SELECT * FROM admin_opid WHERE id_admin = ?', [req.params.id_admin],(error, result, fields) => {
        if(!error) {
            res.send(result)           
        }            
        else
            res.status(400).send('Bad request')     
    })
})

app.delete('/API/admin/:id_admin', (req, res) => {
    mysqlConnection.query('DELETE FROM admin_opid WHERE id_admin = ?', [req.params.id_admin], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            res.status(400).send('Bad request')    
    })
})

app.post('/API/admin', (req, res) => {
    let admin = req.body     
    let sql = `CALL adminAddorEdit('${admin.id_admin}','${admin.nama_admin}','${admin.email_admin}',
        '${md5(admin.password_admin)}','${md5(admin.foto_admin)}','${admin.role}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)            
            res.send('sukses insert new data')            
        else { 
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})

app.put('/API/admin', (req, res) => {
    let admin = req.body     
    let sql = `CALL adminAddorEdit('${admin.id_admin}','${admin.nama_admin}','${admin.email_admin}',
        '${md5(admin.password_admin)}','${md5(admin.foto_admin)}','${admin.role}');`
    
    mysqlConnection.query(sql, (error, result, fields) => {
        if(!error)            
            res.send('sukses update data')            
        else { 
            console.log(error)
            res.status(400).send('Bad request')    
        }            
    })
})


