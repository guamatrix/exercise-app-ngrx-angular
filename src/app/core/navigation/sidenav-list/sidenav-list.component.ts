import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.componentInfo.next(this.onClose);
  }

  onClose() {
    // console.log('cerre');
    this.close.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
