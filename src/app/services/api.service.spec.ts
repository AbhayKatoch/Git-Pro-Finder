import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data Correctly',()=>{
    const mockUser = {id:1, name:'abhaykatoch'};
    service.getUser('abhaykatoch').subscribe(user=>{
      expect(user).toEqual(mockUser);
    });
    const request = httpMock.expectOne('https://api.github.com/users/abhaykatoch');
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  })

  it('should fetch repositories correctly', () => {
    const mockRepos = [{ id: 101, name: "repo1" }, { id: 102, name: "repo2" }];
    service.getRepo('abhaykatoch', 1, 10).subscribe((repos: any) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });
    const request = httpMock.expectOne('https://api.github.com/users/abhaykatoch/repos?page=1&per_page=10');
    expect(request.request.method).toBe('GET');
    request.flush(mockRepos);
  });
  
});
