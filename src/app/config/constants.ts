import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  // ใส่ ip เครื่องตัวเอง ที่ทำการรัน server.ts แล้ว
  public readonly API_ENDPOINT: string = 'http://10.160.104.4:3000';
}