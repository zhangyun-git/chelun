// 动态判断域名
let host = !/localhost/.test(window.location.host) ? 'http://baojia-test.chelun.com' : 'https://baojia.chelun.com';


function sendRequest(url, method = 'GET', data = {}) {
  let params = {
    method
  }
  // 判断如果是一个POST请求，带上请求体信息
  if (method == "POST") {
    params.body = JSON.stringify(data)
  }
  // 判断请求查询是否携带query
  if (url.indexOf('?') == -1) {
    url += `?_${+new Date()}`
  } else {
    url += `&_${+new Date()}`
  }
  return fetch(host+url, params).then(res=>res.json()).then(body=>body)
}


// 获取车辆品牌数据
export let getBrandList = ()=>{
  return sendRequest('/v2-car-getMasterBrandList.html')
}


// 获取车系数据
export let getMakeList = (id) => {
  return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
}

// 获取详情页数据
export let getDetail = (id) => {
  return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}

// 获取报价页面的数据
export let getOffer = (carId, cityId) => {
  return sendRequest(`/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`)
}

// 获取cityId的数据
export let getcityId = () => {
  return sendRequest(`/location-client.html`)
}

// 获取city的数据
export let getCity = () => {
  return sendRequest(`/v1-city-alllist.html`)
}

// 获取city省份的数据
export let getCityRight = (id) => {
  return sendRequest(`/v1-city-alllist.html?provinceid=${id}`)
}

// 获取图片详情数据
export let getImgAll = (params) => {
  if (!params.ColorId && !params.carId) {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${params}`)
  }

  if (params.ColorId) {
      return sendRequest(`/v2-car-getImageList.html?SerialID=${params.SerialID}&ColorID=${params.ColorId}`)
  }

  if (params.carId) {
      return sendRequest(`/v2-car-getImageList.html?SerialID=${params.SerialID}&CarID=${params.CarID}`)
  }

}

/**
 * 获取图片列表的接口
 * @param {*} serialId  车系id
 * @param {*} imgId   图片分类id
 * @param {number} [page=1] 分页页码数
 * @param {number} [pageSize=30] 分页每页数量
 * @param {*} carId  车型id
 * @param {*} colorId 颜色id
 * @returns promise
 */
export let getImgList = (param)=>{
  let search = ``;
  for(let i in param){
      search += `&${i}=${param[i]}`;
  }
  // 补充page与pageSize
  if (!param['Page']){
      search += `&Page=1`;
  }
  if (!param['PageSize']){
      search += `&PageSize=30`;
  }
  return sendRequest(`/v2-car-getCategoryImageList.html?${search.slice(1, search.length)}`);
}

// 获取车辆颜色数据
export let getColorType = (id) => {
  return sendRequest(`/v2-car-getModelImageYearColor.html?SerialID=${id}`)
}