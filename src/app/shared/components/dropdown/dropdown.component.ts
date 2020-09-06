import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@app/modules/auth/business/auth.service';

@Component({
  selector: 'ag-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isDropdownOpen = false;

  @Input() name: string;

  ngOnInit(): void {}

  onClickOutside() {
    this.isDropdownOpen = false;
  }

  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
