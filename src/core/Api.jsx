import axios from "axios"

export const LocationURL = "/req/data?key=20B7CC35-174B-39C4-AB85-75001F1D7962&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO"
export const LocationURL2 = "/req/data?key=20B7CC35-174B-39C4-AB85-75001F1D7962&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIGG_INFO"
// export const LocationURL3 = "/req/data?key=20B7CC35-174B-39C4-AB85-75001F1D7962&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=3&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADEMD_INFO"

// 도/특별시/광역시 데이터
export const getCTPAPI = async () => {
    try {
        const response = await axios.get(LocationURL);
        return response.data.response.result.featureCollection.features.map(item => item.properties.ctp_kor_nm)
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// 시/군/구 데이터
export const getSIGAPI = async () => {
    try {
        const response = await axios.get(LocationURL2);
        return response.data.response.result.featureCollection.features.map(item => item.properties.full_nm)
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// export const getADRIAPI = async () => {
//     try {
//         const response = await axios.get(LocationURL3);
//         return response.data.response.result.featureCollection.features.map(item => item.properties.full_nm)
//     } catch(error) {
//         console.log(error);
//         throw error;
//     }
// }