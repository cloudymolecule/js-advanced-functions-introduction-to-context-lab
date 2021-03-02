function createEmployeeRecord(record){
    let employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(records){
    return records.map(function(record){
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(record, dateStamp){
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.substring(11, 15)),
        date: dateStamp.substring(0, 10)
    })
    return record
}

function createTimeOutEvent(record, dateStamp){
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.substring(11, 15)),
        date: dateStamp.substring(0, 10)
    })
    return record
}

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find((e) => e.date === date).hour
    const timeOut = record.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    const dates = []
    let total = 0
    record.timeInEvents.forEach(element => {
        dates.push(element.date)
    })
    dates.forEach(element => {
        total = total + wagesEarnedOnDate(record, element)
    })
    return total
}

function findEmployeeByFirstName(records, firstName){
    return records.find((record) => record.firstName === firstName)
}

function calculatePayroll(records){
    let totalWages = 0
    records.forEach(element => {
        totalWages = totalWages + allWagesFor(element)
    })
    return totalWages
}