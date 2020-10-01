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

  showSidebar = false;
  isScrolled = false;
  showMenu = false;
  isOpen = false;
  menuItems = [];
  megaMenuList ;
  profile: Profile;

  ngOnInit(): void {
    this.userService.getProfileInfo().subscribe((res) => {
      this.profile = res;
    });

    this.userService.getMenu().subscribe((res) => {
      this.menuItems = this.generateMenu(res);
      this.megaMenuList = this.menuItems[0].list;
    });
  }

  generateMenu(menu) {
    let lvl1 = [];
    menu.forEach((res) => {
      if (res.lvl == 1) {
        lvl1.push(res);
        Object.assign(lvl1, { list: [] });
      }
    });
    lvl1.forEach((res) => {
      let list = [];
      menu.forEach((m) => {
        if (m.lvl == 2 && m.parentId === res.id) {
          list.push(m);
        }
      });
      res.list = list;
      list = [];
      res.list.forEach((item) => {
        Object.assign(item, { children: [] });
        menu.forEach((m) => {
          if (m.lvl == 3 && m.parentId === item.id) {
            list.push(m);
          }
        });
        item.children = list;
        list = [];
      });
    });
    return lvl1;
  }

  showSubMenuById(rootId) {
    this.megaMenuList = this.menuItems[rootId - 1].list;
    console.log(this.megaMenuList);
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.remove('show');
  }
}
