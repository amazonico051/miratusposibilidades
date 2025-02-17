/**
 * DOM SETUP
 */
const updateDOM = () => {
    /** if Error */
    if (info?.metaInfo?.p && info.metaInfo.p !== '') {
        alert('ERROR: Corrija el método de pago o intente con un nuevo método de pago. (LTAMRR8800023)');
    }

    /** Passengers */
    const labelPassengers = document.querySelector('#resume-passengers');
    labelPassengers.innerHTML = '';
    
    if ((info?.flightInfo?.adults || 0) > 0) {
        labelPassengers.innerHTML += `${info.flightInfo.adults} ${info.flightInfo.adults > 1 ? 'Adultos' : 'Adulto'}`;
    }
    if ((info?.flightInfo?.children || 0) > 0) {
        labelPassengers.innerHTML += `, ${info.flightInfo.children} ${info.flightInfo.children > 1 ? 'Niños' : 'Niño'}`;
    }
    if ((info?.flightInfo?.babies || 0) > 0) {
        labelPassengers.innerHTML += `, ${info.flightInfo.babies} ${info.flightInfo.babies > 1 ? 'Bebés' : 'Bebé'}`;
    }

    /** Flight Cost */
    let totalPassengers = (info?.flightInfo?.adults || 0) + (info?.flightInfo?.children || 0);
    let baseCostOrigin = PRECIO_BASE * MULTIPLICADORES_PRECIO[info?.flightInfo?.origin?.ticket_type] * totalPassengers;
    let baseCostDestination = PRECIO_BASE * MULTIPLICADORES_PRECIO[info?.flightInfo?.destination?.ticket_type] * totalPassengers;
    let totalCost = info?.flightInfo?.travel_type === 1 ? baseCostOrigin + baseCostDestination : baseCostOrigin;
    
    document.querySelector('#resume-cost').textContent = `COP ${Math.ceil(totalCost).toLocaleString('es-ES')},00`;
    document.querySelector('#btn-cost').textContent = `COP ${Math.ceil(totalCost).toLocaleString('es-ES')},00`;
    document.querySelector('#payment-cost').textContent = `$ ${Math.ceil(totalCost).toLocaleString('es-ES')},00`;

    /** Schedules & Departures */
    const resumeTravelDiv = document.querySelector('#resume-travel');
    let format = new Date(parseInt(info?.flightInfo?.flightDates?.[0] || 0));
    let dayIndex = format.getDay() === 0 ? 6 : format.getDay() - 1;
    resumeTravelDiv.innerHTML = `
        <div class="mb-4">
            <p class="m-0 fw-bold fs-5 tc-ocean">De ${info?.flightInfo?.origin?.city} a ${info?.flightInfo?.destination?.city}</p>
            <p class="m-0 mt-1 fs-5 tc-gray-smoke">${(dayDic[dayIndex]).toLowerCase()}. ${format.getDate()} de ${(monthDic[format.getMonth()]).toLowerCase()}</p>
            <p class="m-0 mt-1 fs-5 tc-gray-smoke">${info?.flightInfo?.origin?.ticket_sched?.takeoff} ${info?.flightInfo?.origin?.code} → ${info?.flightInfo?.origin?.ticket_sched?.landing} ${info?.flightInfo?.destination?.code}</p>
        </div>
    `;
    if (Number.isFinite(info?.flightInfo?.flightDates?.[1])) {
        let format2 = new Date(parseInt(info.flightInfo.flightDates[1]));
        let dayIndex2 = format2.getDay() === 0 ? 6 : format2.getDay() - 1;
        resumeTravelDiv.innerHTML += `
            <div class="mb-4">
                <p class="m-0 fw-bold fs-5 tc-ocean">De ${info?.flightInfo?.destination?.city} a ${info?.flightInfo?.origin?.city}</p>
                <p class="m-0 mt-1 fs-5 tc-gray-smoke">${(dayDic[dayIndex2]).toLowerCase()}. ${format2.getDate()} de ${(monthDic[format2.getMonth()]).toLowerCase()}</p>
                <p class="m-0 mt-1 fs-5 tc-gray-smoke">${info?.flightInfo?.destination?.ticket_sched?.takeoff} ${info?.flightInfo?.destination?.code} → ${info?.flightInfo?.destination?.ticket_sched?.landing} ${info?.flightInfo?.origin?.code}</p>
            </div>
        `;
    }
};

updateDOM();
