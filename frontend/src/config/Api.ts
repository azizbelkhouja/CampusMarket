import axios from 'axios';

export const API_URL = "http://localhost:2025";
export const DEPLOYED_URL = ""

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});