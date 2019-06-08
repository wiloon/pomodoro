import {Component, Input, OnInit} from '@angular/core';
import {Pomodoro} from '../pomodoro';
import {timer} from 'rxjs';
import {pluck, take, timeInterval} from 'rxjs/operators';
import {formatDate} from '@angular/common';

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


  }


  keepScreenOn(): void {
    // invoke javascript
    toggleWakeLock();
  }
}
