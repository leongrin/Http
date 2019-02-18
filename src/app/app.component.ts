import {Component, OnDestroy} from '@angular/core';
import {ServerService} from './server.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  appName = this.serverServ.getAppName();

  httpSubscription: Subscription;

  constructor(private serverServ: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSave() {
    this.httpSubscription = this.serverServ.storeServers(this.servers).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
  );
  }

  onGet() {
    this.serverServ.getServers().subscribe(
      (servers) => console.log(servers),
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }
}
