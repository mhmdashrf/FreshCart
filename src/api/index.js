import axios from "axios"

const API_URL = 'https://ecommerce.routemisr.com/api/v1'

export async function routeAPI(uri,method,data,headers, params){
    return axios(`${API_URL}/${uri}`,{
        method,
        data,
        headers,
        params
    })
}