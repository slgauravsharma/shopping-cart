export const get = (objects, value, defaultValue) => {
    if (!objects.hasOwnProperty(value)) {
        return defaultValue
    }
    return objects[value]
}

export const has = (objects, value) => objects.hasOwnProperty(value)
