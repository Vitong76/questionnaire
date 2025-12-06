import { createBrowserRouter } from 'react-router';

import MainLayout from '@/layouts/MainLayout';
import ManageLayout from '@/layouts/ManageLayout';
import QuestionLayout from '@/layouts/QuestionLayout';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Home from '@/pages/Home';
import ManageList from '@/pages/manage/List';
import ManageStar from '@/pages/manage/Star';
import ManageTrash from '@/pages/manage/Trash';
import QuestionEdit from '@/pages/question/Edit';
import QuestionStat from '@/pages/question/Stat';

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: '*',
                Component: NotFound
            },
            {
                path: 'manage',
                Component: ManageLayout,
                children: [
                    {
                        path: 'list',
                        Component: ManageList
                    },
                    {
                        path: 'star',
                        Component: ManageStar
                    },
                    {
                        path: 'trash',
                        Component: ManageTrash
                    }
                ]
            },
            {
                path: 'question',
                Component: QuestionLayout,
                children: [
                    {
                        path: 'edit/:id',
                        Component: QuestionEdit
                    },
                    {
                        path: 'stat/:id',
                        Component: QuestionStat
                    }
                ]
            }
        ]
    }
]);

export default router;
