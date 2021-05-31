import { ChangeDetectorRef, Component } from '@angular/core';
import { CommunicationService } from './communiction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public username;
  public password;
  public modeDataArray = new Array(3);
  public selectedMode = ['BROADCASTED', 'WINDOWPOST', 'CACHESTORAGE'];
  title = 'communicationAmongTabs';

  constructor(private commService: CommunicationService, private changes: ChangeDetectorRef){
    this.listenToChanges();
    this.commService.credentials.subscribe(event => {
      this.username = event.username;
      this.password = event.password;
      this.modeDataArray[event.selected - 1] = event;
      this.changes.detectChanges();
    })
  }

  setCredentials(mode){
    switch(mode)
    {
      case 1 : this.commService.setBroadcast({username: this.username, password: this.password, selected: 1}); break;
      case 2 : this.commService.setWindowPost({username: this.username, password: this.password, selected: 2}); break;
      case 3 : this.commService.setCacheData({username: this.username, password: this.password, selected: 3}); break;
      case 4 : this.commService.resetAll(); break;
    }
    this.listenToChanges();
  }

  listenToChanges(){
    this.commService.getCacheData();
    this.commService.getBroadcast();
    this.commService.getWindowPost();
    console.log(this.modeDataArray);
  }
  
}
