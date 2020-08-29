export class Config {
    public static Title: string = 'سیستم';
    public static ApiUrl: string = 'http://192.168.63.51:8080/';
    // public static ApiUrl: string = 'http://localhost:8080/';
    public static MenuApiUrl: string = 'App/MenuSelect';
    public static PermissionApiUrl: string = 'Security/UserPermission';
    public static AssetsUrl: string = 'assets'; // 'app/assets';
    public static ContentsUrl: string = Config.AssetsUrl + '/contents';
    public static LoginPage: string = '/login';
    public static CacheTimeout: number = 10;
}
