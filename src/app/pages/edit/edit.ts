import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../../services/api/trip';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {
  // เรียกใช้ service จาก trip.service.ts
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private tripService: Trip, 
  ) {}

  // ประกาศตัวแปรที่ยังไม่ได้ใส่ค่าที่มีอยู่จริงลงไป
  tripId: number = 0;
  name: string = '';
  country: string = '';
  destinationid: number | null = null;
  coverimage: string = '';
  detail: string = '';
  price: number = 0;
  duration: number = 0;

  // ไม่ได้เรียกใช้ api แต่ประกาศเอง
  destinations: Destination[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  // ไม่ได้เรียกใช้ api แต่ประกาศเอง
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

  // เมื่อเข้ามาที่หน้านี้จะทำงานทันที
  async ngOnInit() {
    // ใช้ activatedroute เพื่อหา และใส่ id เข้าไปใน tripId
    this.tripId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.tripId) {
      try {
        // เรียกใช้ service จาก trip.service.ts
        const trip = await this.tripService.getTripByID(this.tripId);

        // ถ้ามีข้อมูลจะใส่ข้อมูลลงไป
        if (trip) {
          this.name = trip.name;
          this.country = trip.country;
          this.coverimage = trip.coverimage;
          this.detail = trip.detail;
          this.price = trip.price;
          this.duration = trip.duration;

          // ทำการแปลงจากชื่อโซนเป็น id ของโซน
          const did = this.destinations.find(d => d.name === trip.destination_zone);
          this.destinationid = did ? did.value : null;
        }
      } catch(err) {
        alert('Error : ' + err);
      }
    }
  }

  // ฟังก์ชันอัปเดตทริป
  async updateTrip() {
    // สร้างตัวแปรเพื่อเก็บข้อมูลไว้เตรียมอัปเดต
    const body = {
      name: this.name,
      country: this.country,
      destinationid: this.destinationid,
      coverimage: this.coverimage,
      detail: this.detail,
      price: this.price,
      duration: this.duration
    }

    try {
      // เรียกใช้งาน service จาก trip.service.ts
      await this.tripService.updateTrip(this.tripId, body);
      alert('แก้ไขข้อมูลสำเร็จ');
      this.router.navigate(['/detail', this.tripId])
    } catch(err) {
      alert('Error : ' + err);
    }
  }
}

// ใช้สำหรับสร้างที่เก็บข้อมูลโซน
interface Destination {
  value: number;
  name: string;
}

// ใช้สำหรับสร้างที่เก็บข้อมูลประเทศ
interface Country {
  name: string;
}