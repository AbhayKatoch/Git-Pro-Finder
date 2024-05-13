import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  githubUsername: string ='';
  userInfo: any;
  userRepos: any[]=[] ;
  userTopics:{[key:string]:any[]} ={} ;
  currentPage:number =1;
  perPage:number =10;
  
  pageOptions= [10,20,50,100]
  
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    
    this.apiService.getRepo('abhaykatoch').subscribe(console.log);

  }

    getUserf(page:number=1){
      if(this.githubUsername){
        this.apiService.getUser(this.githubUsername).subscribe(
          (user : any)=>{
            this.userInfo = user;
          }
        );
        this.apiService.getRepo(this.githubUsername, page, this.perPage).subscribe(
          (repos: any)=>{
            
            this.userRepos =repos;  
         

            repos.forEach((repo : any) => {
              this.apiService.getTopics(this.githubUsername,repo.name ).subscribe((languages : any)=>{
               this.userTopics[repo.name]= Object.keys(languages);
              }
              );

              
            });         

          }
        );
        
      }
    }

    onPageChange(page: number){
      this.currentPage=page;
      this.getUserf(this.currentPage);
    }

    onPageSizeChange(newSize:number){
      this.perPage = newSize;
      this.getUserf(1);
    }

    generatePageNumbers() : number[]{
      const totalRepos = this.userInfo ? this.userInfo.public_repos : 0; // Assuming public_repos is a valid property

      const totalPages = Math.ceil(totalRepos /this.perPage)
      let pages= []
      for(let i =1;i<=totalPages;i++){
        pages.push(i);
      }
      return pages
    }
  
}
