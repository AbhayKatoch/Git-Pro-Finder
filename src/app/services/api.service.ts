import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`)
    
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 

  getRepo(githubUsername :string, page: number=1,perPage: number =10){
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`)
  }
  
  getTopics(githubUsername :string, repoName :string){
    return this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repoName}/languages`)
  }
}
