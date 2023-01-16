interface replayData {
    audio:ArrayBuffer
    chart:chart
    input:Array<inputData>
}

interface inputData {
    time:number
    key:number
}