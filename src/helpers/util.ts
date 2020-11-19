const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

// export function extend<T, U>(to: T, from: U): T & U {
//   let result = {} as T & U
//   for (let id in to) {
//     ;(result as any)[id] = (to as any)[id]
//   }
//   for (let id in from) {
//     if (!result.hasOwnProperty(id)) {
//       ;(result as any)[id] = (from as any)[id]
//     }
//   }
//   return result
// }

export function extend<T, U>(to: T, from: U): T & U {
  function copy(instance: U) {
    Object.keys(instance).forEach(key => {
      Object.assign(to, {
        [key]: instance[key as keyof U]
      })
    })

    const proto = Object.getPrototypeOf(instance)

    if (proto !== null) {
      copy(proto)
    }
  }

  copy(from)

  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
