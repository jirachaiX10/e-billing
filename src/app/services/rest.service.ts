import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    responseType: 'text',
  });

  private apiUrl = environment.apiUrl;
  private apiVersion = `${this.apiUrl}/api/v1`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(environment.access_token)
    })
  };

  constructor(private http: HttpClient) { }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(environment.access_token) != null;
  }

  login(request_data: any): Observable<any> {
    return this.http.post(`${this.apiVersion}/authenticate`, request_data);
  }

  meter(): Observable<any> {
    return this.http.get(`${this.apiVersion}/meter`, this.httpOptions);
  }

  tenant(): Observable<any> {
    return this.http.get(`${this.apiVersion}/tenant`, this.httpOptions);
  }

  leases(): Observable<any> {
    return this.http.get(`${this.apiVersion}/leases`, this.httpOptions);
  }

  invoice(month: string): Observable<any> {
    const httpOption = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(environment.access_token)
      },
      params: {
        'billing_cycle': month,
      }
    };
    return this.http.get(`${this.apiVersion}/invoice`, httpOption);
  }

  graph(required: any): Observable<any> {
    const httpOption = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(environment.access_token)
      },
      params: {
        'parameter': 'kwh',
        'type': 'mdb',
        'sensor_id': 1,
        'start_time':required.start,
        'end_time':required.end
      }
    };

    return this.http.get(`${this.apiVersion}/graph`, httpOption);
  }

}
