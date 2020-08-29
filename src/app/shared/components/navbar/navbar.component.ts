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


   menuItems = [
    {
      id: '1',
      title:'ایتم 1',
      list: ['11', '12'],
    },
    {
      id: '2',
      title:'ایتم 2',
      list: ['21', '22'],
    },
    {
      id: '3',
      title:'ایتم 3',
      list: ['31', '32', '33'],
    },
    {
      id: '4',
      title:'ایتم4',
      list: ['41'],
    },
  ];
  megaMenuList = this.menuItems[0].list;

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

  onMouseEnter(rootId) {
    this.megaMenuList = this.menuItems.find((item) => item.id == rootId).list;
  }
  onMouseEnterMenuItem(id: string) {
    document.querySelector("#"+id).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector("#"+id).classList.remove('show');
  }
}
