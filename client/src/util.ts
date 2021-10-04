const base = "//api"

export function get(path) {
    return fetch(base+path)
    .then(x => x.json())
    .then(x => {
        console.log(x)
        return x
    })
}

export function post(path, data) {
    fetch(base+path,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(x => x.json())
    .then(x => {
        console.log(x)
        return x
    })   
}
