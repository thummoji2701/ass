document.addEventListener('DOMContentLoaded', function() {
    // --- Mock Data matching the graph appearance ---
    const jessicaTaylorData = {
        name: "Jessica Taylor",
        patient_info: "Female, 28",
        dob: "August 23, 1996",
        gender: "Female",
        contact: "(415) 555-1234",
        emergency: "(415) 555-5678",
        insurance: "Sunrise Health Assurance",
        diagnosis_history: [
            { month: 'Oct, 2023', systolic: 120, diastolic: 110 },
            { month: 'Nov, 2023', systolic: 115, diastolic: 65 },
            { month: 'Dec, 2023', systolic: 160, diastolic: 110 },
            { month: 'Jan, 2024', systolic: 110, diastolic: 92 },
            { month: 'Feb, 2024', systolic: 150, diastolic: 72 },
            { month: 'Mar, 2024', systolic: 160, diastolic: 78 }
        ],
        vitals: {
            respiratory_rate: { value: "20 bpm", status: "Normal" },
            temperature: { value: "98.6°F", status: "Normal" },
            heart_rate: { value: "78 bpm", status: "Lower than Average" },
        },
        bp_readings: {
            systolic: { value: 160, status: "Higher than Average", arrow: "▲" },
            diastolic: { value: 78, status: "Lower than Average", arrow: "▼" }
        },
        diagnostic_list: [
            { problem: "Hypertension", description: "Chronic high blood pressure", status: "Under Observation" },
            { problem: "Type 2 Diabetes", description: "Insulin resistance and elevated blood sugar", status: "Cured" },
            { problem: "Asthma", description: "Recurrent episodes of bronchial constriction", status: "Inactive" },
            { problem: "Chronic Kidney Disease", description: "Progressive loss of kidney function", status: "Under Observation" },
            { problem: "Seasonal Allergies", description: "Allergic reaction to pollen and dust", status: "Inactive" },
        ],
        lab_results: [
            "Blood Tests",
            "CT Scans",
            "Radiology Reports",
            "X-Rays",
            "Urine Test",
            "Lipid Panel",
            "Thyroid Function Tests",
            "Liver Function Tests"
        ]
    };

    // --- Chart Initialization ---
    function initChart(historyData) {
        const labels = historyData.map(d => d.month);
        const systolicData = historyData.map(d => d.systolic);
        const diastolicData = historyData.map(d => d.diastolic);

        const ctx = document.getElementById('bpChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.bpChartInstance) {
            window.bpChartInstance.destroy();
        }

        window.bpChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Systolic',
                        data: systolicData,
                        // Systolic Color: Pink/Fuchsia
                        borderColor: '#C27CE5', 
                        backgroundColor: '#C27CE5',
                        // Match graph line style
                        tension: 0.4,
                        fill: false,
                        pointRadius: 6,
                        pointBackgroundColor: '#C27CE5',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Diastolic',
                        data: diastolicData,
                        // Diastolic Color: Dark Violet
                        borderColor: '#8C6FE0', 
                        backgroundColor: '#8C6FE0',
                         // Match graph line style
                        tension: 0.4,
                        fill: false,
                        pointRadius: 6,
                        pointBackgroundColor: '#8C6FE0',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Legend is manually created outside the chart
                    },
                    tooltip: {
                         enabled: true // Enable tooltips
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false // Hide vertical grid lines
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 12, weight: 600 }
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 180,
                        ticks: {
                            stepSize: 20,
                            color: '#6b7280',
                            font: { size: 12 }
                        },
                        grid: {
                            // Light gray horizontal grid lines matching the image
                            color: '#E6E6E6', 
                            borderDash: [5, 5] // Dashed line (optional, use solid if preferred)
                        }
                    }
                }
            }
        });
    }

    // --- Data Population Function ---
    function populateData(patient) {
        // 1. Profile Card
        document.getElementById('patient-name').textContent = patient.name;
        document.getElementById('patient-dob').textContent = patient.dob;
        document.getElementById('patient-gender').textContent = patient.gender;
        document.getElementById('patient-contact').textContent = patient.contact;
        document.getElementById('patient-emergency').textContent = patient.emergency;
        document.getElementById('patient-insurance').textContent = patient.insurance;

        // 2. BP Readings
        document.getElementById('bp-systolic-value').textContent = patient.bp_readings.systolic.value;
        document.getElementById('bp-systolic-status').textContent = patient.bp_readings.systolic.status;
        document.getElementById('bp-diastolic-value').textContent = patient.bp_readings.diastolic.value;
        document.getElementById('bp-diastolic-status').textContent = patient.bp_readings.diastolic.status;

        // 3. Vitals Grid
        document.getElementById('resp-value').textContent = patient.vitals.respiratory_rate.value;
        document.getElementById('resp-status').textContent = patient.vitals.respiratory_rate.status;
        document.getElementById('temp-value').textContent = patient.vitals.temperature.value;
        document.getElementById('temp-status').textContent = patient.vitals.temperature.status;
        document.getElementById('hr-value').textContent = patient.vitals.heart_rate.value;
        document.getElementById('hr-status').textContent = patient.vitals.heart_rate.status;

        // 4. Diagnostic List
        const diagBody = document.getElementById('diag-list-body');
        diagBody.innerHTML = '';
        patient.diagnostic_list.forEach(diag => {
            const row = diagBody.insertRow();
            row.insertCell().textContent = diag.problem;
            row.insertCell().textContent = diag.description;
            row.insertCell().textContent = diag.status;
        });

        // 5. Lab Results
        const labList = document.getElementById('lab-results-list');
        labList.innerHTML = '';
        patient.lab_results.forEach((result, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${result} <img class="download-icon" src="./image/download_FILL0_wght300_GRAD0_opsz24 (1)@2x.png" alt="Download">`;
            // Manually set 'CT Scans' as active to match the design image
            if (result === "CT Scans") {
                li.classList.add('active');
            }
            labList.appendChild(li);
        });

        // 6. Chart (Blood Pressure)
        initChart(patient.diagnosis_history);
    }

    // Load initial data for Jessica Taylor
    populateData(jessicaTaylorData);

    // Note: To make other patients interactive, you would need to implement
    // an event listener on the '.patient-list li' elements to call populateData()
    // with the corresponding patient's data.
});