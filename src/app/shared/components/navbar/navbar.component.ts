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
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  cartCount: number = 0;

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
        {
          label: 'بیمه',
          routerLink: ['/base/insurances'],
          icon: 'fa fa-minus',
        },
        {
          label: 'اپلیکیشن',
          routerLink: ['/base/apps'],
          icon: 'fa fa-minus',
        },
        { label: 'استان ', routerLink: ['/base/states'], icon: 'fa fa-minus' },
        { label: 'شهر', routerLink: ['/base/cities'], icon: 'fa fa-minus' },
        {
          label: 'ناحیه ',
          routerLink: ['/base/districts'],
          icon: 'fa fa-minus',
        },
        { label: 'شغل ', routerLink: ['/base/jobs'], icon: 'fa fa-minus' },
        { label: 'برند', routerLink: ['/base/brands'], icon: 'fa fa-minus' },
        {
          label: 'دسته بندی الحاقیات فروشگاه ',
          routerLink: ['/base/attachment-types'],
          icon: 'fa fa-minus',
        },
        {
          label: 'تعطیلات فروشگاه اصلی',
          routerLink: ['/base/holidays'],
          icon: 'fa fa-minus',
        },
        {
          label: 'ساعت تحویل',
          routerLink: ['/base/shipping-hours'],
          icon: 'fa fa-minus',
        },
        {
          label: 'نظرسنجی امتیازی ',
          routerLink: ['/base/point-types'],
          icon: 'fa fa-minus',
        },
        {
          label: 'دسته بندی فیلد',
          routerLink: ['/base/attribute-categories'],
          icon: 'fa fa-minus',
        },
        {
          label: 'فیلد',
          routerLink: ['/base/attributes'],
          icon: 'fa fa-minus',
        },
      ],
    },
    {
      label: 'مدیریت سایت',
      items: [
        {
          label: 'درباره ما',
          routerLink: ['/base/about'],
          icon: 'fa fa-minus',
        },
        {
          label: 'شماره تلفن ',
          routerLink: ['/base/phones'],
          icon: 'fa fa-minus',
        },
        {
          label: 'شبکه اجتماعی',
          routerLink: ['/base/socials'],
          icon: 'fa fa-minus',
        },
        { label: 'اسلایدر', routerLink: ['/base/slider'], icon: 'fa fa-minus' },
        {
          label: 'تنظیمات صفحه اصلی',
          routerLink: ['/base/main-setting'],
          icon: 'fa fa-minus',
        },
        {
          label: 'دسته بندی سوالات متداول',
          routerLink: ['/base/faq-categories'],
          icon: 'fa fa-minus',
        },
        {
          label: 'سوالات متداول',
          routerLink: ['/base/faq'],
          icon: 'fa fa-minus',
        },
        {
          label: 'حریم شخصی',
          routerLink: ['/base/privacy'],
          icon: 'fa fa-minus',
        },
        { label: 'مقررات', routerLink: ['/base/terms'], icon: 'fa fa-minus' },
      ],
    },
    {
      label: 'مدیریت محصولات',
      items: [
        {
          label: 'دسته بندی محصولات',
          routerLink: ['/product/categories/list'],
          icon: 'fa fa-minus',
        },
        {
          label: 'محصولات',
          routerLink: ['/product/list'],
          icon: 'fa fa-minus',
        },
        {
          label: 'کد تخفیف',
          routerLink: ['/product/discount'],
          icon: 'fa fa-minus',
        },
        {
          label: 'بازدید محصولات',
          routerLink: ['/product/views'],
          icon: 'fa fa-minus',
        },
        {
          label: 'علاقه مندی کاربران',
          routerLink: ['/product/favorites'],
          icon: 'fa fa-minus',
        },
        {
          label: 'نظرات کاربران',
          routerLink: ['/product/comments'],
          icon: 'fa fa-minus',
        },
      ],
    },
    {
      label: 'مدیریت سفارشات',
      items: [],
    },
    {
      label: 'مدیریت کاربران',
      items: [
        {
          label: 'کاربران',
          routerLink: ['/user/users'],
          icon: 'fa fa-minus',
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
