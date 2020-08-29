import { Component, HostListener, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'ag-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() isHomePage: boolean;

  isScrolled = false;
  selectedLang = 'فارسی';
  showMenu = false;
  isOpen = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollTop = event.target.scrollingElement.scrollTop;
    if (scrollTop > 2) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  ngOnInit(): void {}

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  closeNavbar() {
    this.isOpen = false;
  }

  navigate(path: string) {
    this.closeNavbar();
    this.router.navigate([path]);
  }
}
