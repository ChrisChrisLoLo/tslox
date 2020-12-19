let hadError: boolean = false;

function runInput(): void{
}

function run(src: string): void{
    const tokens: string[] = src.split('');

    for (const token in tokens){
        console.log(token);
    }
}

function error(line: number, message: string): void{
    report(line, "", message);
}

function report(line: number, where: string, message: string){
    console.error(`[line ${line}] Error ${where} : ${message}`);
    hadError = true;
}