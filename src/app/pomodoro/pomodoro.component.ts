import {Component, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {pluck, timeInterval} from 'rxjs/operators';

declare function toggleWakeLock(): any;

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.styl']
})
export class PomodoroComponent implements OnInit {

  pomodorotime = '0';

  state = '';
  dateTimeStart = new Date();
  dateTimeStartString = '';
  paletteColour = 'primary';


  constructor() {
  }

  ngOnInit() {
    const sourcef = timer(1000, 1000)
      .pipe(
        timeInterval(),
        pluck('interval')
      );

    sourcef.subscribe(val => this.updateTimer(val));
    this.keepScreenOn();
    this.dateTimeStart = new Date();
  }

  updateTimer(val: number): void {

    const diff = new Date().getTime() - this.dateTimeStart.getTime();
    const result = diff / (1000 * 60);
    if (this.state === '') {
      return;
    }
    if (
      this.state === 'long' && result < 25 ||
      this.state === 'short' && result < 5) {
      this.pomodorotime = result.toFixed(2);
    } else {
      if (this.paletteColour === 'primary') {
        this.paletteColour = 'warn';
      } else {
        this.paletteColour = 'primary';
      }
    }
  }

  tick(): void {
    this.dateTimeStart = new Date();
    this.dateTimeStartString = this.dateTimeStart.toLocaleString();

    this.pomodorotime = '0';
    if (this.state === '' || this.state === 'short') {
      this.state = 'long';
    } else {
      this.state = 'short';
    }
    this.paletteColour = 'primary';
  }


  keepScreenOn(): void {
    // invoke javascript
    toggleWakeLock();
  }
}
