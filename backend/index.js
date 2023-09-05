const express = require('express')
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse request's body

app.post("/", function (req, res) {
  const {items} = req.body
  
  const groupByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = []
    }
    acc[item.type].push(item)
    return acc
  }, {})

  const sumByType = Object.entries(groupByType).map(item => {
    console.log(item);
    if(item[1].length < 2) {
      return [item[0], item[1][0].value * parseInt(item[1][0].amount)]
    }

    return [item[0], item[1].reduce((previous, actual) => parseFloat(previous.value) + (parseFloat(actual.value) * parseInt(actual.amount)))]
  })

  res.status(200).json({budget: sumByType})
});

async function closeGracefully(signal) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`)

  server.close(() => {
    console.log('Server closed')
    process.kill(process.pid, signal)
  })
}

process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

