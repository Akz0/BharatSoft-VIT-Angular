import { PracticalCourse } from './../../courses/state/courses.model';
import { Component, Input, OnInit } from '@angular/core';
import { TheoryCourse } from '../../courses/state/courses.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: TheoryCourse | PracticalCourse;
  constructor() {}
  ngOnInit(): void {}
}
