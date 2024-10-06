import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

export interface LightInfo {
  title?: string;
  amount?: number;
  infoStyle?: 'bg-success' | 'bg-danger' | 'bg-warning';
}

@Component({
  selector: 'app-light-info',
  standalone: true,
  imports: [NgClass],
  templateUrl: './light-info.component.html',
  styleUrl: './light-info.component.scss'
})
export class LightInfoComponent implements OnInit {

  @Input() lightInfo: LightInfo = {};

  ngOnInit(): void { }

}
