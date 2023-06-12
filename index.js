console.log('Hello')
function createEmployeeRecord(array){
    const record = {}

    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, date){
    const obj = {}
    
    obj.type = 'TimeIn'
    obj.hour = parseInt(`${date[11]}${date[12]}` + '00')
    obj.date = date.slice(0, 10)

    record.timeInEvents.push(obj)
    return record
}

function createTimeOutEvent(record, date){
    const obj = {}

    obj.type = 'TimeOut'
    obj.hour = parseInt(`${date[11]}${date[12]}` + '00')
    obj.date = date.slice(0, 10)

    record.timeOutEvents.push(obj)
    return record
}

function hoursWorkedOnDate(record, date){
    let timeIn = 0
    let timeOut = 0

    record.timeInEvents.forEach(element => {
        if (element.date === date.slice(0, 10)){
            timeIn = element.hour
        }
    });

    record.timeOutEvents.forEach(element => {
        if (element.date === date.slice(0, 10)){
            timeOut = element.hour
        }
    })
    return (timeOut - timeIn) * 0.01
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    const dates = []
    let wages = 0

    record.timeInEvents.forEach(element => {
        dates.push(element.date)
    })

    dates.forEach(date => wages += wagesEarnedOnDate(record, date))
    return wages
}

function calculatePayroll(array){
    return array.reduce((accum, current) => accum + allWagesFor(current), 0)
}