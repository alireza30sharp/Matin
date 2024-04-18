import { Component, OnInit } from '@angular/core';
import { MenuModel, sidBarModel } from '~/share/models';
import { MenuService } from '~/share/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private _menuService: MenuService) {}
  showMenu: boolean = false;

  openSidebar: boolean = true;

  menuSidebar: Array<sidBarModel> = [];
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
  }
  ngOnInit(): void {
    this.getAllMenu();
  }

  getAllMenu() {
    this._menuService.getAllMenu('panel', 'student_panel').subscribe((list) => {
      this.menuSidebar = this.mapMenuItems(list, null);
    });
  }
  private mapMenuItems(
    originalItems: MenuModel[],
    parentMenuId: number | null
  ): sidBarModel[] {
    const filteredItems = originalItems.filter(
      (item) => item.menu_parent === parentMenuId
    );

    return filteredItems.map((item) => {
      const submenu = this.mapMenuItems(originalItems, item.menu_pk_id);
      return {
        link_name: item.menu_name,
        link: item.menu_url || '',
        icon: item.menu_fontawesome_icons || '',
        sub_menu: submenu,
        showSubmenu: submenu.length > 0,
        img: item.menu_image_icons || '',
      };
    });
  }
}
