export default async function getUsers(req, res) {
    const resp = await fetch(`http://localhost:5000/users`)
    const users = await resp.json()
    res.status(200).json(users)
  }