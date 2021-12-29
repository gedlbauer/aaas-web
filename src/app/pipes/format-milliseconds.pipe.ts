import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMilliseconds'
})
export class FormatMillisecondsPipe implements PipeTransform {

  transform(totalMillis: number): string {
    const totalSeconds = totalMillis / 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`;
  }

}
