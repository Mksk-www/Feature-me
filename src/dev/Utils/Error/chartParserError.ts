class ChartParserError extends Error {
    constructor(e: string | undefined) {
        super(e)
        this.name = "ChartParserError";
        this.message = `Could not parse chart file. it may includes illegal statement or file could not load successfully. \n${e}`
    }
}

export default ChartParserError