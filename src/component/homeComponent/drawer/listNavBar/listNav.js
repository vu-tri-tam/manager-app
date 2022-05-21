import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorIcon from '@mui/icons-material/Error';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const ListSiderBar = [
    {
        name: "Thống kê tất cả",
        path: '/doashboard-page',
        icon: <DashboardIcon />
    },
    {
        name: "Đã hoàn thành",
        path: '/finished-page',
        icon: <AssignmentTurnedInIcon />
    },
    {
        name: "Chưa hoàn thành",
        path: '/not-finish-page',
        icon: <ErrorIcon />
    },
    {
        name: "Tài khoản",
        path: '/setting-account-page',
        icon: <AccountCircleIcon />
    },
    {
        name: "Tất cả công việc",
        path: '/list-work-page',
        icon: <InboxIcon />
    },
    {
        name: "Lịch sử",
        path: '/history-page',
        icon: <WorkHistoryIcon />
    }
]

// export const ListSiderBar2 = [
//     {
//         name: "Danh sách công việc",
//         path: '/list-work-page',
//         icon: <InboxIcon />
//     },
//     {
//         name: "Lịch sử",
//         path: '/history-page',
//         icon: <WorkHistoryIcon />
//     }
// ]
