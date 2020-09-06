import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '@app/modules/users/business/user.service';
import { Profile } from '@app/modules/users/model/user.model';

@Component({
  selector: 'ag-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  @Input() isHomePage: boolean;
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollTop = event.target.scrollingElement.scrollTop;
    if (scrollTop > 100) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  isScrolled = false;
  showMenu = false;
  isOpen = false;
  menuItems = [
    {
      id: '1',
      title: 'ایتم 1',
      icon: 'cheeseburger',
      list: ['11', '12'],
    },
    {
      id: '2',
      title: 'ایتم 2',
      icon: 'marker',
      list: ['21', '22'],
    },
    {
      id: '3',
      title: 'ایتم 3',
      icon: 'tshirt',
      list: ['31', '32', '33'],
    },
    {
      id: '4',
      title: 'ایتم4',
      icon: 'motorcycle',
      list: ['41'],
    },
  ];
  megaMenuList = this.menuItems[0].list;
  profile: Profile;
  
  ngOnInit(): void {
    this.userService.getProfileInfo().subscribe((res) => {
      this.profile = res;
    });
  }

  showSubMenuById(rootId) {
    this.megaMenuList = this.menuItems.find((item) => item.id == rootId).list;
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.remove('show');
  }
}
