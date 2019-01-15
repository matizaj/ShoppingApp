import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService, private auth: AuthService) { }

  ngOnInit() {
  }

  onSave() {
    this.dataStorage.storeRecipes().subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  onFetch() {
    this.dataStorage.getRecipes();
  }
  onLogOut() {
    this.auth.logout();
  }
}
