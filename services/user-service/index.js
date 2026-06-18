const express = require("express")
const app = express()
app.use(express.json())

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
]

app.get("/health", (req, res) => res.json({ status: "ok" }))
app.get("/users", (req, res) => res.json(users))
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).json({ error: "Not found" })
  res.json(user)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`user-service running on ${PORT}`))
