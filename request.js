const xhr = new XMLHttpRequest()
xhr.timeout = 10 * 1000
const lab_json_baseURL = 'https://jsonplaceholder.typicode.com'
const yikeyun_appid = '39778348'
const yikeyun_secret = '8f67QLpP'
const openWeatherAPI_baseURL = 'https://v0.yiketianqi.com/free/day'
const API = {
    postList: lab_json_baseURL+'/posts',
    imageList: lab_json_baseURL + '/photos',
    weatherAPI: `${openWeatherAPI_baseURL}?appid=${yikeyun_appid}&appsecret=${yikeyun_secret}&vue=1&unescape=1`,
    randomImage: 'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images'
}

/**
 * Promise风格封装AJAX
 * @param {*} param0 
 * @returns 
 */
function request({ method, url }){
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText))
                }else {
                    reject(xhr.status)
                }
            }
        }
        xhr.open(method, url, true)
        xhr.send();
    })
}

/**
 * 获取帖子列表数据
 * @returns list
 */
export async function getPostsAPI(){
    return await request({ method: 'GET', url: API.postList })
}

/**
 * 获取图片列表数据
 * @returns list
 */
export async function getImagesAPI(){
    return await request({ method: 'GET', url: API.imageList })
}

/**
 * 获取指定城市的天气实况
 * @param {*} cityName 城市名称, 不带市区等
 * @returns 
 */
export async function getCityWeatherAPI(cityName){
    return await request({ method: 'GET', url: API.weatherAPI+`&city=${cityName}` })
}

/**
 * 随机图片API
 * @returns 
 */
export async function randomPicAPI() {
    return await request({ method: 'GET', url: API.randomImage })
 }