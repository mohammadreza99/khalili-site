import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { TreeNode } from 'primeng';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor() {
    super();
  }

  getProductInfo(code) {
    return this.get('/V1/Product/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data[0]));
  }

  getProductFields(code) {
    return this.get('/V1/ProductInfo/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductPrice(code) {
    return this.get('/V1/ProductPrice/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductMedia(code) {
    return this.get('/V1/ProductMedia/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getProductDescription(code) {
    return this.get('/V1/ProductDescription/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data[0].description));
  }

  getProductComments(code) {
    return this.get('/V1/ProductComment/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getRelatedProducts(code) {
    return this.get('/V1/ProductLinked/', 'json', {
      ProductCode: code,
    }).pipe(map((res: any) => res.data));
  }

  getCategoryDescription(id: any) {
    return this.get('/V1/CategoryDescription/?categoryId='+id, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategorySlider(id: any) {
    return this.get('/V1/CategorySlider/?categoryId='+id,'json').pipe(
      map((res: any) => res.data)
    );
  }
  getCategoryImages(id: any) {
    return this.get('/V1/CategorySpecial/?categoryId='+id,'json').pipe(
      map((res: any) => res.data)
    );
  }
  getCategoryMainPage(id: any) {
    return this.get('/V1/CategoryMainPage/?categoryId='+id,'json').pipe(
      map((res: any) => res.data)
    );
  }
  getCategoryAllList(id: any) {
    return this.get('/V1/CategoryAllList/?categoryId='+id,'json').pipe(
      map((res: any) => res.data)
    );
  }

  convertToTreeNodeList(items=[]) {
    let result: TreeNode[] = [];
    items.forEach((item) => {
      const t: TreeNode = {
        label: item.title,
        data: {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          link: item.link,
          isSubMenu: item.isSubMenu,
        },
        children: this.getTreeNodeChildrenFromCategory(item, items),
        selectable: true,
        key: item.id.toString(),
      };
      
      if (t.children.length == 0) {
        t.icon = 'pi pi-minus';
      }
      result.push(t);
    });
    return result;
  }
  getTreeNodeChildrenFromCategory(
    category,
    originalCategories
  ) {
    let children: TreeNode[] = [];
    originalCategories.forEach((item) => {
      if (item.parentId == category.id) {
        const childNode: TreeNode = {
          label: item.title,
          data: {
            id: item.id,
            title: item.title,
            parentId: item.parentId,
            link: item.link,
            isSubMenu: item.isSubMenu,
          },
          children: this.getTreeNodeChildrenFromCategory(
            item,
            originalCategories
          ),
          selectable: true,
          key: item.id.toString(),
        };
        if (childNode.children.length == 0) {
          childNode.icon = 'pi pi-minus';
        }
        children.push(childNode);
      }
    });
    return children;
  }
}
