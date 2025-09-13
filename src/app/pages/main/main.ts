import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TripGetResponse } from '../../model/response/trip_get_res';
import { Trip } from '../../services/api/trip';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule, 
    MatSelectModule, 
    MatCardModule, 
    RouterLink
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  // เรียกใช้งาน service จาก trip.service.ts
  constructor(private tripService: Trip) {}

  // ประกาศ trips สำหรับข้อมูลที่ต้องการ, allTrips เรียกใช้ทั้งหมด
  trips: TripGetResponse[] = [];
  allTrips: TripGetResponse[] = [];

  // ใช้สำหรับเก็บชื่อโซน
  selectedDestinationZone: string = '';

  // ไม่ได้เรียกใช้งาน api แต่ประกาศเอง
  destinations: Destinations[] = [
    { value: 1, name: 'เอเชีย' },
    { value: 2, name: 'ยุโรป' },
    { value: 3, name: 'เอเชียตะวันออกเฉียงใต้' },
    { value: 9, name: 'ประเทศไทย' },
  ];

  // เมื่อเข้ามาที่หน้านี้จะทำงานทันที
  async ngOnInit() {
    this.loadDataAsync();
    // เรียกใช้งาน service จาก trip.service.ts
    this.allTrips = await this.tripService.getAllTrip();

    console.log('Init State');
  }

  // ฟังก์ชันสำหรับโหลดข้อมูล trip ทั้งหมด
  async loadDataAsync() {
    this.trips = await this.tripService.getAllTrip();
    console.log(this.trips);
  }

  // ฟังก์ชันสำหรับค้นหาทริปด้วย id
  async getTripById(input: HTMLInputElement) {
    const value = input.value.trim();

    // เรียกใช้งาน service จาก trip.service.ts
    if (!value) {
      this.trips = await this.tripService.getAllTrip();
    } else {
      this.trips = [await this.tripService.getTripByID(+input.value) as TripGetResponse];
    }
  }

  // ฟังก์ชันสำหรับค้นหาทริปด้วยชื่อ
  async getTripByName(input: HTMLInputElement) {
    const value = input.value.trim();

    // เรียกใช้งาน service จาก trip.service.ts
    if (!value) {
      this.trips = await this.tripService.getAllTrip();
    } else {
      const trips = await this.tripService.getTripByName(input.value);

      // ใช้ filter หาชื่อที่ต้องการ ไม่ว่าจะเป็นตัวพิมพ์เล็ก หรือพิมพ์ใหญ่
      this.trips = trips.filter(trip => 
        trip.name.toLowerCase().includes(input.value.toLowerCase())
      );
    }
  }

  // ฟังก์ชันสำหรับค้นหาทริปด้วยโซน
  async getTripByDestination() {
    // ใช้ filter หาโซนนั้น ๆ ที่ต้องการ
    if (this.selectedDestinationZone) {
      this.trips = this.allTrips.filter(
        trip => trip.destination_zone === this.selectedDestinationZone
      );
    } else {
      this.trips = this.allTrips;
    }
  }
  
  // เอาไว้ใช้เมื่อ url ของรูปใช้งานไม่ได้ (แต่ไม่ได้รองรับ hotlinked)
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;

    // ตั้ง fallback box
    imgElement.src = ''; // ลบ src เดิมเพื่อหยุดโหลด
    imgElement.alt = 'ไม่สามารถโหลดรูปได้';

    // ใช้ style ให้เป็นกล่องพร้อม border สีและพื้นหลัง
    imgElement.style.width = '100%';
    imgElement.style.height = '200px';
    imgElement.style.border = '2px solid #ccc';
    imgElement.style.borderRadius = '8px';
    imgElement.style.backgroundColor = '#f0f0f0';
    imgElement.style.display = 'flex';
    imgElement.style.justifyContent = 'center';
    imgElement.style.alignItems = 'center';
    imgElement.style.fontWeight = 'bold';
    imgElement.style.color = '#333';

    // แสดงข้อความเมื่อ hover
    imgElement.title = 'ไม่สามารถโหลดรูปได้';
  }

}

// ใช้สำหรับการสร้างข้อมูลโซน
interface Destinations {
  value: number;
  name: string;
}