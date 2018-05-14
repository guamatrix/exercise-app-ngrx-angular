import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  @Input() isLoged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onToggle() {
    this.toggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
