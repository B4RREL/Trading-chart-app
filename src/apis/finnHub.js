import axios from "axios"

const TOKEN = "ch8irf1r01qqlf8p7390ch8irf1r01qqlf8p739g";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})