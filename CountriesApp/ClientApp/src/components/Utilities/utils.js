export function calculatePopulation(data) {
    return data.reduce((total, value) => total = total + value.population, 0);
}