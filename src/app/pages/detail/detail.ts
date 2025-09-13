import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '../../services/api/trip';
import { TripGetResponse } from '../../model/response/trip_get_res';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  // เรียกใช้ service จาก trip.service.ts
  constructor(
    private tripService: Trip, 
    // เรียกใช้ ActivatedRoute เพราะต้องการดึงข้อมูลนั้น ๆ ที่อยู่ใน url
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  // สร้าง trips ที่จะเก็บข้อมูลต่าง ๆ ที่จะแสดง
  trips: TripGetResponse[] = [];

  // เมื่อเข้ามาที่หน้านี้จะทำงานทันที
  ngOnInit(): void {
    console.log('Init State');

    // สร้างตัวแปรเพื่อค้นหา และเก็บ id ของทริป
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTrip(id);
    }
  }

  // ฟังก์ชันกลับไปหน้าหลัก
  goBack() {
    this.router.navigate(['/']);
  }

  // ฟังก์ชันโหลดข้อมูลทริปนั้น ๆ
  async loadTrip(id: number) {
    this.trips = [await this.tripService.getTripByID(id) as TripGetResponse];
    console.log(this.trips);
  }

  // เอาไว้ใช้เมื่อ url ของรูปใช้งานไม่ได้ (แต่ไม่ได้รองรับ hotlinked)
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    // ตั้ง fallback box
    img.src = '';     // ลบ src เดิมเพื่อหยุดโหลด
    img.alt = 'ไม่สามารถโหลดรูปได้';

    // ใช้ style ให้เป็นกล่องพร้อม border สีและพื้นหลัง
    img.style.width = '300px';
    img.style.height = '200px';
    img.style.border = '2px solid #ccc';
    img.style.borderRadius = '8px';
    img.style.backgroundColor = '#f0f0f0';
    img.style.display = 'flex';
    img.style.justifyContent = 'center';
    img.style.alignItems = 'center';
    img.style.fontWeight = 'bold';
    img.style.color = '#333';

    // แสดงข้อความเมื่อ hover
    img.title = 'ไม่สามารถโหลดรูปได้';
  }

  // ฟังก์ชันลบทริป
  async deleteTrip() {
    if (!confirm('คุณต้องการลบใช่หรือไม่?')) return;

    // สร้างตัวแปรเพื่อค้นหา และเก็บ id ของทริป
    const delete_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    try {
      await this.tripService.deleteTrip(delete_id);
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      this.router.navigate(['/']);
    } catch (err) {
      alert('Error : ' + err);
    }
  }
}
