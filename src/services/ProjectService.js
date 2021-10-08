export async function getProjects() {

    const response = await fetch('http://qab01.weblakes.com:3080/api/projects');
    return await response.json();
}

export async function runBat(data) {
    const response = await fetch('http://qab01.weblakes.com:3080/api/runBat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({infos: data})
      })
    return await response.json();
}