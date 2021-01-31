import http from '@/plugins/axios'

module.exports ={
  get (url, transformer) {
    return new Promise((resolve, reject) => {
      http.get(url).then((response) => {
        if (response.status === 200) {
          let result = response.data
          if (transformer) result = transformer(result)
          resolve(result)
        }
      }, (error) => {
        reject(error)
        console.log(error)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  post (url, data, transformer) {
    return new Promise((resolve, reject) => {
      http.post(url, data).then((response) => {
        if (response.status === 200) {
          let result = response.data
          if (transformer) result = transformer(result)
          resolve(result)
        }
      }, (error) => {
        reject(error)
        console.log(error)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  put (url, data, transformer) {
    return new Promise((resolve, reject) => {
      http.put(url, data).then((response) => {
        if (response.status === 200) {
          let result = response.data
          if (transformer) result = transformer(result)
          resolve(result)
        }
      }, (error) => {
        reject(error)
        console.log(error)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  delete (url, data, transformer) {
    return new Promise((resolve, reject) => {
      http.delete(url, data).then((response) => {
        if (response.status === 200) {
          let result = response.data
          if (transformer) result = transformer(result)
          resolve(result)
        }
      }, (error) => {
        reject(error)
        console.log(error)
      }).catch((err) => {
        console.log(err)
      })
    })
  }

}