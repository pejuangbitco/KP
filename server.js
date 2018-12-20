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
            console.log(error)
    })
})

app.get('/API/lokasi/:id_lokasi', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi],(error, result, fields) => {
        if(!error) {
            res.send(result)            
        }            
        else
            console.log(error) 
    })
})

app.delete('/API/lokasi/:id_lokasi', (req, res) => {
    mysqlConnection.query('DELETE FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
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
            console.log(error)
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
            console.log(error)
    })
})

// kategori SECTION
app.get('/API/kategori', (req, res) => {
    mysqlConnection.query('SELECT * FROM kategori', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            console.log(error)
    })
})

app.get('/API/kategori/:id_kategori', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM kategori WHERE id_kategori = ?', [req.params.id_kategori],(error, result, fields) => {
        if(!error) {
            res.send(result)            
        }            
        else
            console.log(error) 
    })
})

app.delete('/API/kategori/:id_kategori', (req, res) => {
    mysqlConnection.query('DELETE FROM kategori WHERE id_kategori = ?', [req.params.id_kategori], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
    })
})

app.post('/API/kategori', (req, res) => {
    let kategori = req.body     
    let sql = 'SET @id_kategori = ?; SET @nama_kategori = ?; \
    CALL kategoriAddorEdit(@id_kategori, @nama_kategori);'
    
    mysqlConnection.query(sql, [kategori.id_kategori, kategori.nama_kategori], (error, result, fields) => {
        if(!error)            
            res.send('sukses insert data')            
        else
            console.log(error)
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
            console.log(error)
    })
})



// lokasi SECTION
app.get('/API/lokasi', (req, res) => {
    mysqlConnection.query('SELECT * FROM lokasi', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            console.log(error)
    })
})

app.get('/API/lokasi/:id_lokasi', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi],(error, result, fields) => {
        if(!error) {
            res.send(result)            
        }            
        else
            console.log(error) 
    })
})

app.delete('/API/lokasi/:id_lokasi', (req, res) => {
    mysqlConnection.query('DELETE FROM lokasi WHERE id_lokasi = ?', [req.params.id_lokasi], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
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
            console.log(error)
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
            console.log(error)
    })
})

// produk SECTION
app.get('/API/produk', (req, res) => {
    mysqlConnection.query('SELECT * FROM produk', (error, result, fields) => {
        if(!error) {
            res.send(result)
        }            
        else
            console.log(error)
    })
})

app.get('/API/produk/:id_produk', (req, res) => {
    console.log(req.params)
    mysqlConnection.query('SELECT * FROM produk WHERE id_produk = ?', [req.params.id_produk],(error, result, fields) => {
        if(!error) {
            res.send(result)            
        }            
        else
            console.log(error) 
    })
})

app.delete('/API/produk/:id_produk', (req, res) => {
    mysqlConnection.query('DELETE FROM produk WHERE id_produk = ?', [req.params.id_produk], (error, result, fields) => {
        if(!error)
            res.send('Delete data berhasil')
        else
            console.log(error)
    })
})

app.post('/API/produk', (req, res) => {
    let produk = req.body     
    let sql = 'SET @id_produk = ?; SET @nama_produk = ?; \
    CALL produkAddorEdit(@id_produk, @nama_produk);'
    
    mysqlConnection.query(sql, [produk.id_produk, produk.nama_produk], (error, result, fields) => {
        if(!error) {
            let imgs = produk.image_produk
            sql = 'INSERT INTO image_produk (image, produk_id_produk) VALUE (?,?)'
            imgs.forEach(img => {
                img = md5(img)
                mysqlConnection.query(sql, [img, result], (error) => {
                    if(!error)            
                                   
                    else
                        console.log(error)
                })
            })

            res.send('sukses insert data')            
            
        }                       
        else
            console.log(error)
    })    
})

app.put('/API/produk', (req, res) => {
    let produk = req.body    
    let sql = 'SET @id_produk = ?; SET @nama_produk = ?; \
    CALL produkAddorEdit(@id_produk, @nama_produk);'
    
    mysqlConnection.query(sql, [produk.id_produk, produk.nama_produk], (error, result, fields) => {
        if(!error) 
            res.send('sukses update data')
        else
            console.log(error)
    })
})




