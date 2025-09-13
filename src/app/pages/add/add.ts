import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../../services/api/trip';

@Component({
  selector: 'app-add',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    RouterLink, 
    MatSelectModule
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss'
})
export class Add {
  // เรียกใช้ service จาก Trip.Service.ts
  constructor(
    private tripService: Trip, 
    private router: Router
  ) {}

  // ประกาศตัวแปรเป็นค่าที่ยังไม่ได้ใส่อะไรลงไป
  name: string = '';
  destinationid: number = 0;
  country: string = '';
  coverimage: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  // ใช้วิธีกำหนดค่าเอง ไม่ได้ดึงจาก api
  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  // ใช้วิธีกำหนดค่าเอง ไม่ได้ดึงจาก api
  countries: Country[] = [
    { name: 'สวิตเซอร์แลนด์' }, 
    { name: 'สิงคโปร์' }, 
    { name: 'เวียดนาม' }, 
    { name: 'ลาว' }, 
    { name: 'ไอซ์แลนด์' }, 
    { name: 'เยอรมันนี' }, 
    { name: 'ญี่ปุ่น' }, 
    { name: 'มัลดีฟส์' }, 
    { name: 'อินเดีย' }, 
    { name: 'มาเลเซีย' }, 
    { name: 'ฝรั่งเศส' }, 
    { name: 'เกาหลี' }, 
    { name: 'ประเทศไทย' }, 
    { name: 'จีน' }, 
  ];

  // ฟังก์ชันเพิ่มทริป
  async addTrip() {
    // สร้างตัวแปร body เพื่อเตรียมเพ่ิมข้อมูล
    const body = {
      name: this.name,
      destinationid: this.destinationid,
      country: this.country,
      coverimage: this.coverimage,
      detail: this.detail,
      price: this.price,
      duration: this.duration
    };

    try {
      // เรียกใช้ฟังก์ชันจาก trip.service.ts
      await this.tripService.addTrip(body);
      alert('เพิ่มข้อมูลสำเร็จ');
      this.router.navigate(['']);
    } catch (err) {
      alert('Error : ' + err);
    }
  }
}

// ใช้สำหรับสร้างข้อมูลที่เป็นโซน
interface Destination {
  value: number;
  name: string;
}

// ใช้สำหรับสร้างข้อมูลที่เป็นประเทศ
interface Country {
  name: string;
}