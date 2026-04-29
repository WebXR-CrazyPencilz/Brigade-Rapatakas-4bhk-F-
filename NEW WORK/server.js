const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Serve viewer
app.use(express.static(path.join(__dirname, 'public')))

// Serve textures
app.use('/texture', express.static(path.join(__dirname, 'texture')))

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin')))

const HOTSPOTS_FILE = path.join(__dirname, 'hotspots.json')

// GET hotspots
app.get('/api/hotspots', (req, res) => {
  const data = JSON.parse(fs.readFileSync(HOTSPOTS_FILE, 'utf-8'))
  res.json(data)
})

// SAVE hotspots
app.post('/api/hotspots', (req, res) => {
  fs.writeFileSync(HOTSPOTS_FILE, JSON.stringify(req.body, null, 2))
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log('✅ 360 Viewer running at http://localhost:3000')
  console.log('🛠️  Admin panel at http://localhost:3000/admin')
})
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000")
})