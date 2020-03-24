import { Express, Router } from 'express';
import IPathRoute from '../configs/IPathRoute';
import UserRoute from './UserRoutes';

export default class AppRoutes {
    private routeList: IPathRoute[] = [
        {path: '/user', router: UserRoute}
    ];

    mount(expApp: Express): void {
        this.routeList.forEach((item) => {
            expApp.use(
                item.path,
                item.router.createRoute(Router)
            );
        });
    }
}