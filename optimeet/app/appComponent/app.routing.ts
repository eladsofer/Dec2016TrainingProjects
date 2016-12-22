import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {ApproveMeetingCompponent} from "../approveMeetingComponent/approve.meeting.component";
import {NewMeetingCompponent} from "../newMeetingComponent/new.meeting.component";


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ApproveMeeting/:id', component: ApproveMeetingCompponent },
    { path: 'NewMeeting', component: NewMeetingCompponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
