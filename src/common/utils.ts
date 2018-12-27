export function sec2time(timeInSeconds: number): string {
    var pad = function(num: number, size: number) { 
        return ('000' + num).slice(size * -1); 
    };

    let time: string = timeInSeconds.toFixed(3);
    let hours: number = Math.floor(parseInt(time) / 60 / 60);
    let minutes = Math.floor(parseInt(time) / 60) % 60;
    let seconds = Math.floor(parseInt(time) - minutes * 60);
    let milliseconds = time.slice(-3);

    return /*pad(hours, 2) + ':' +*/ pad(minutes, 2) + ':' + pad(seconds, 2);
}