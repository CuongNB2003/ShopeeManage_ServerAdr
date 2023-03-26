

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6']

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Lượt truy cập',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [10, 27, 56, 34, 24, 53],
            tension: 0.4,
        },
        {
            label: 'Lượt truy cập',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [10, 27, 56, 34, 24, 53],
            tension: 0.4,
        },
        {
            label: 'Lượt truy cập',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [10, 27, 56, 34, 24, 53],
            tension: 0.4,
        }
    ]
}


const config = {
    type: 'line',
    data: data,
}
const canvas = document.getElementById('canvas')
const chart = new Chart(canvas, config)