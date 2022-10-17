import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Banner from './components/Banner';
import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import TopTitle from './components/TopTitle';
import NotFound from '~/pages/NotFound';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import Hall from '~/pages/Hall';
import HallDetail from '~/pages/HallDetail';
import Service from '~/pages/Service';
import Order from '~/pages/Order';

import DefaultLayout from './layouts/DefaultLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/wedding-ui/sign-up" element={<SignUp></SignUp>}></Route>
                <Route path="/wedding-ui/sign-in" element={<SignIn></SignIn>}></Route>
                <Route
                    path="/wedding-ui"
                    element={
                        <DefaultLayout>
                            <Banner></Banner>
                            <Home></Home>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/menus"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Thực đơn"></TopTitle>
                            <Menu></Menu>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/menus/:foodId"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Thực đơn"></TopTitle>
                            <Menu></Menu>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/halls"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Sảnh cưới"></TopTitle>
                            <Hall></Hall>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/halls/:hallId/"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Chi tiết sảnh cưới"></TopTitle>
                            <HallDetail></HallDetail>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/services"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Dịch vụ"></TopTitle>
                            <Service></Service>
                        </DefaultLayout>
                    }
                ></Route>
                <Route
                    path="/wedding-ui/orders"
                    element={
                        <DefaultLayout>
                            <TopTitle itemNav="Đặt tiệc cưới"></TopTitle>
                            <Order></Order>
                        </DefaultLayout>
                    }
                ></Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
