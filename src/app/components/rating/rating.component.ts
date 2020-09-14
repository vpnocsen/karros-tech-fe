import { Component, Input, OnInit } from '@angular/core';
export enum STAR {
  LESS = 'star-less',
  HALF = 'start-half',
  FULL = 'star'
}
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() set point(val: number) {
    this.value = val || 0;
    if (val) {
      this.stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= val) {
          this.stars.push(STAR.FULL);
        } else if (i - 0.9 <= val) {
          this.stars.push(STAR.HALF)
        } else {
          this.stars.push(STAR.LESS)
        }
      }
    } else {
      this.stars = [STAR.LESS, STAR.LESS, STAR.LESS, STAR.LESS, STAR.LESS];
    }
  };
  stars = [STAR.LESS, STAR.LESS, STAR.LESS, STAR.LESS, STAR.LESS];
  value = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
