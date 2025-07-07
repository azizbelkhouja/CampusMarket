import axios from "axios"


const api = "http://localhost:2025/products"

export const fetchProducts = async() => {

    try {
        const response = await axios.get(api)
        console.log("response ", response)
    } catch (error) {
        console.error(error)
    }
}