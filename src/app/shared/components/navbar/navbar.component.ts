import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/business/auth.service';
import { UserService } from '@app/modules/users/business/user.service';
import { Profile } from '@app/modules/users/model/user.model';
import { MenuItem } from 'primeng';

@Component({
  selector: 'ag-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

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
  megaMenuList;
  profile: Profile;
  sideMenuItems: MenuItem[] = [
    {
      label: 'مدیریت اطلاعات پایه',
      items: [
        { label: 'رنگ ', routerLink: ['/base/colors'], icon: 'fa fa-minus' },
        {
          label: 'گارانتی ',
          routerLink: ['/base/warranties'],
          items: [
            {
              label: 'رنگ ',
              routerLink: ['/base/colors'],
              icon: 'fa fa-minus',
            },
            {
              label: 'رنگ ',
              routerLink: ['/base/colors'],
              icon: 'fa fa-minus',
            },
            {
              label: 'رنگ ',
              routerLink: ['/base/colors'],
              icon: 'fa fa-minus',
            },
            {
              label: 'رنگ ',
              routerLink: ['/base/colors'],
              icon: 'fa fa-minus',
            },
          ],
        },
      ],
    },
  ];
  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.userService.getProfileInfo().subscribe((res) => {
        this.profile = res;
      });

    this.userService.getMenu().subscribe((res) => {
      this.menuItems = this.generateMenu(res);
      this.sideMenuItems = this.generateSideMenu(res);
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

  generateSideMenu(menu) {
    let lvl1 = [];
    menu.forEach((res) => {
      if (res.lvl == 1) {
        Object.assign(res, { label: res.title ,routerLink: ['/products/category/'+res.id]});
        lvl1.push(res);
        Object.assign(lvl1, { items: [] });
      }
    });
    lvl1.forEach((res) => {
      let list = [];
      menu.forEach((m) => {
        if (m.lvl == 2 && m.parentId === res.id) {
          Object.assign(m, { label: m.title ,routerLink: ['/products/subcategory/'+m.id]});
          list.push(m);
        }
      });
      res.items = list;
      list = [];
      res.items.forEach((item) => {
        Object.assign(item, { items: [] });
        menu.forEach((m) => {
          if (m.lvl == 3 && m.parentId === item.id) {
            Object.assign(m, { label: m.title, routerLink: ['/products/subcategory/'+m.id]});
            list.push(m);
          }
        });
        item.items = list;
        list = [];
      });
    });
    let sideMenuItems: MenuItem[] = [];
    lvl1.forEach((item) => {
      let menuItem: MenuItem = { label: item.title ,routerLink:item.routerLink};
      if (item.items.length != 0) {
        let itemsList: MenuItem[] = [];
        item.items.forEach((element) => {
          let m = { label: element.title ,routerLink:element.routerLink};
          if (element.items.length != 0) {
            Object.assign(m, { items: element.items });
          }
          itemsList.push(m);
        });
        Object.assign(menuItem, { items: itemsList });
      }
      sideMenuItems.push(menuItem);
    });
    return sideMenuItems;
  }

  showSubMenuById(rootId) {
    this.megaMenuList = this.menuItems[rootId - 1].list;
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.remove('show');
  }
}
