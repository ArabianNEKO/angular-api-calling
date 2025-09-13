import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TripGetResponse } from '../../model/response/trip_get_res';
import { TripPostRequest } from '../../model/request/trip_post_req';
import { TripPostResponse } from '../../model/response/trip_post_res';

@Injectable({
  providedIn: 'root'
})
export class Trip {
  // เรียกใช้ constants เพื่อใช้ API_ENDPOINT
  constructor(private constants : Constants, private http: HttpClient) {}

  // ทริปทั้งหมด
  public async getAllTrip(options?: any) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url));

    return response as TripGetResponse[];
  }

  // ทริปตาม id
  public async getTripByID(id: number): Promise<TripGetResponse | null> {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.get(url));

    return response as TripGetResponse;
  }

  // ทริปตามชื่อ
  public async getTripByName(name: string) {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(this.http.get(url, { params: { name: name } }));

    return response as TripGetResponse[];
  }

  // เพิ่มทริป
  public async addTrip(data: TripPostRequest): Promise<TripPostResponse> {
    const url = this.constants.API_ENDPOINT + '/trip';
    const response = await lastValueFrom(
      this.http.post<TripPostResponse>(url, data)
    );

    return response;
  }

  // อัปเดตทริป
  public async updateTrip(id: number, data: any) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.put(url, data));

    return response;
  }

  // ลบทริป
  public async deleteTrip(id: number) {
    const url = `${this.constants.API_ENDPOINT}/trip/${id}`;
    const response = await lastValueFrom(this.http.delete(url));

    return response;
  }
}
