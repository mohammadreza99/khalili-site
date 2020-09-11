export class SiteAbout {
    id: Object;
    description: string;
    shortDescription: string;
    isActive: boolean;
    userId: Object;
    insertDate: Date;
  }
  export class SitePrivacy {
    id: Object;
    title: string;
    description: string;
    userId: Object;
    isActive: boolean;
    insertDate: Date;
  }
  export class SiteTerms {
    id: Object;
    title: string;
    description: string;
    userId: Object;
    isActive: boolean;
    insertDate: Date;
  }
  export class SiteFAQCategory {
    id: Object;
    title: string;
    keyMedia: string;
    userId: Object;
    isActive: boolean;
    insertDate: Date;
  }
  export class SiteFAQ {
    id: Object;
    fAQCategoryId?: number;
    fAQ: string;
    answer: string;
    keyMedia: string;
    userId: Object;
    isActive: boolean;
    insertDate: Date;
  }
  