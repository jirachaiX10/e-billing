import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';

export interface PeriodicElement {
  time: Date;
  senser_name: string;
  senser_id: number;
  kwh: number;
  vab: number;
  vbc: number;
  vca: number;
  ia: number;
  ib: number;
  ic: number;
  tap: number;
  reactive_power: number;
  freq: number;
  status: string;
}

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.scss']
})
export class MeterComponent implements OnInit {
  response: any = {};
  columns: any = [];
  dataSource: any = [];
  displayedColumns!: string[];
  tamp: any

  public constructor(private rest: RestService) {
  }

  async ngOnInit(): Promise<void> {
    this.rest.meter().subscribe({
      next: (res) => {
        console.log(JSON.stringify(res))
        if (res.meta.response_code === 20000) {
          this.response = res.meta.response_data
          this.columns = this.response.column
          this.dataSource = this.response.value;
          this.displayedColumns = [ 'conv_ip','sensor_id',  'time', 'kwh', 'status'];
        }
      },
      error: (e) => console.error(e)
    });
  }

}
