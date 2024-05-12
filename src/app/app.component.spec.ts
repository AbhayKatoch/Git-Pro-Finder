import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceMock: any;

  // beforeEach(() => TestBed.configureTestingModule({
  //   declarations: [AppComponent]
  // }));

  beforeEach(async() =>{
    apiServiceMock = jasmine.createSpyObj('ApiService',['getUser','getRepo','getTopics']);
    apiServiceMock.getUser.and.returnValue(of({
      name: 'Abhay Katoch',
      bio: 'Developer',
      location:'Earth'
    }))
    apiServiceMock.getRepo.and.returnValue(of([]));
    apiServiceMock.getTopics.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations:[AppComponent],
      providers: [
        {provide: ApiService, useValue: apiServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance;
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
 

  it('should call getUser when getUserf is triggered', () => {
    const userName = 'abhaykatoch';
    component.githubUsername = userName;
    component.getUserf()
    
    expect(apiServiceMock.getUser).toHaveBeenCalledWith(userName);
  });

  
});
