import {Component, Input, OnInit} from '@angular/core';
import {Pomodoro} from '../pomodoro';
import {timer} from 'rxjs';
import {pluck, take, timeInterval} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.styl']
})
export class PomodoroComponent implements OnInit {

  pomodorotime = '0';
  timestampStart = 0;
  state = '';

  constructor() {
  }

  ngOnInit() {
    const sourcef = timer(1000, 1000)
      .pipe(
        timeInterval(),
        pluck('interval')
      );

    sourcef.subscribe(val => this.updateTimer(val));
  }

  updateTimer(val: number): void {
    const now = Date.parse(new Date().toString());
    const diff = new Date().getTime() - this.timestampStart;
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
    this.timestampStart = new Date().getTime();
    this.pomodorotime = 'bar';
    if (this.state === '' || this.state === 'short') {
      this.state = 'long';
    }
  }

  keepScreenOn(): void {
    // invoke javascript
  }
}
