const Joi = require('joi')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
const corsOptions = {
  origin: '*'
}; 

app.use(cors(corsOptions)); 

const musics = []

app.get('/', (req, res)=>{
  res.send('Hello to the bubble API')
})

app.get('/api/musics', (req, res)=>{
  res.send(musics)
})

app.get('/api/musics/:id', (req, res)=>{
  const idMusic = musics.find(m => m.id === parseInt(req.params.id));
  if (!idMusic) res.status(404).send('Element does not exist');
  res.send(idMusic);
})

app.post('/api/musics', (req, res)=>{
  const schema = Joi.object({
    name: Joi.string().required(),
    music: Joi.string().min(1000).required()
  })

  const result = schema.validate(req.body)

  if(result.error){
    res.status(400).send(result.error.details[0].message)
    return
  }

  const music = {
    id: musics.length + 1,
    date: new Date,
    name: req.body.name,
    music: req.body.music
  }
  musics.push(music)
  res.send(music)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server is runing , port ${PORT}`))