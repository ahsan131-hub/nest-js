import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        /* Right it will just return ture no extra validation check. just for demonstration purposes.*/
        console.log('-----this is the gaurd for roles based access-----')
        return true;
    }
}