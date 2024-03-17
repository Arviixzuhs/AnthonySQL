import express from 'express'
import { pool } from './db/dbConnection.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/crear', async (req, res) => {
  const { nombre, cedula, apellido } = req.body

  try {
    await pool.query('INSERT INTO humano (cedula, nombre, apellido) VALUES (?, ?, ?)', [
      cedula,
      nombre,
      apellido,
    ])

    res.status(200).json('Usuario creado correctamente')
  } catch (error) {
    res.status(401).json('Ocurrio un error inesperado')
  }
})

app.get('/obtener', async (req, res) => {
  try {
    const [row] = await pool.query('SELECT * FROM humano')

    return res.status(200).json(row)
  } catch (error) {
    res.status(401).json('Ocurrio un error inesperado')
  }
})

app.get('/buscar/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [row] = await pool.query('SELECT * FROM humano WHERE id = ?', [id])

    if (row.length == 0) return res.status(401).json('Ese usuario no existe')

    return res.status(200).json(row)
  } catch (error) {
    console.log(error)
    res.status(401).json('Ocurrio un error inesperado')
  }
})

app.delete('/borrar/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [row] = await pool.query('DELETE FROM humano WHERE id = ?', [id])

    if (row.affectedRows <= 0) return res.status(401).json('Ese usuario no existe')

    return res.status(200).json('Usuario eliminado correctamente')
  } catch (error) {
    console.log(error)
    res.status(401).json('Ocurrio un error inesperado')
  }
})

app.put('/editar/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, apellido, cedula } = req.body

  try {
    const [row] = await pool.query(
      'UPDATE humano SET nombre = ?, apellido = ?, cedula = ? WHERE id = ?',
      [nombre, apellido, cedula, id]
    )

    if (row.affectedRows <= 0) return res.status(401).json('Ese usuario no existe')

    return res.status(200).json('Usuario actualizado correctamente')
  } catch (error) {
    console.log(error)
    res.status(401).json('Ocurrio un error inesperado')
  }
})

app.listen(process.env.PORT, () => {
  console.log('¡Hola mundo!')
})
