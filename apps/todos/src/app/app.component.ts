import { Component } from '@angular/core';
// import { ServicesModule } from '@learning-workspace/services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';



@Component({
  selector: 'learning-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly apiService: ApiService) {}
}
