import { Component, HostListener, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/business/auth.service';
import { OrderService } from '@app/modules/orders/business/order.service';
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
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  cartCount: number = 0;

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
  sideMenuItems: MenuItem[] = [];
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

    this.orderService.getCartCount().subscribe((res) => {
      this.cartCount = res;
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
        Object.assign(res, {
          label: res.title,
          routerLink: ['/products/category/' + res.id, res.title],
        });
        lvl1.push(res);
        Object.assign(lvl1, { items: [] });
      }
    });
    lvl1.forEach((res) => {
      let list = [];
      menu.forEach((m) => {
        if (m.lvl == 2 && m.parentId === res.id) {
          Object.assign(m, {
            label: m.title,
            routerLink: [`/products/subcategory/${m.id}/${m.title}`],
          });
          list.push(m);
        }
      });
      res.items = list;
      list = [];
      res.items.forEach((item) => {
        Object.assign(item, { items: [] });
        menu.forEach((m) => {
          if (m.lvl == 3 && m.parentId === item.id) {
            Object.assign(m, {
              label: m.title,
              routerLink: [`/products/subcategory/${m.id}/${m.title}`],
            });
            list.push(m);
          }
        });
        item.items = list;
        list = [];
      });
    });
    let sideMenuItems: MenuItem[] = [];
    lvl1.forEach((item) => {
      let menuItem: MenuItem = {
        label: item.title
      };
      if (item.items.length != 0) {
        let itemsList: MenuItem[] = [];
        itemsList.push({ label: 'همه دسته بندی های این دسته', routerLink: item.routerLink })
        item.items.forEach((element) => {
          let m = { label: element.title, routerLink: element.routerLink };
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

  showSubMenuById(rootId, event: any) {
    this.megaMenuList = this.menuItems[rootId - 1].list;
    const element = event.target;
    const parent = event.target.parentElement;
    parent.querySelectorAll('li').forEach((element) => {
      element.classList.remove('bg-active');
    });
    element.classList.add('bg-active');
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector(`#${id}`).classList.remove('show');
  }
}
