const express = require("express")
const axios = require("axios")
const app = express()

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3001"

app.get("/health", (req, res) => res.json({ status: "ok" }))

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

app.get("/api/users/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${USER_SERVICE_URL}/users/${req.params.id}`,
    )
    res.json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "User not found" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`api-gateway running on port ${PORT}`)
})
