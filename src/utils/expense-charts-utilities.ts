export const getYears = (limit: number) => {
    // console.log(new Date().toLocaleDateString().split("/")[2]);
    const thisYear = parseInt(new Date().toLocaleDateString().split("/")[2]);
    const years: string[] = [];
    for (let i = thisYear; i > thisYear - limit; i--) {
        years.push(i + "");
    }
    return years;
};

export const getMonths = (limit: number) => {
    const thisYear = parseInt(new Date().toLocaleDateString().split("/")[2]);
    const thisMonth = parseInt(new Date().toLocaleDateString().split("/")[1]);
    const months: string[] = [];
    for (let i = thisMonth; i > thisMonth - limit; i--) {
        months.push(i + "-" + thisYear);
    }
    return months;
};

export const barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Expenses for each month",
        },
    },
};

export const stackedBarChartOptions = {
    plugins: {
        title: {
            display: true,
            text: "Chart.js Bar Chart - Stacked",
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

export const areaChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};
