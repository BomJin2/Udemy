// 도전/연습

// 1. 5개의 새로운 (더미) 페이지 구성 요소를 추가합니다(콘텐츠는 간단한 <h1> 요소일 수 있음).
// - HomePage
// - EventsPage
// - EventDetailPage
// - NewEventPage
// - EditEventPage
// 2. 이 5개 페이지에 대한 라우팅 및 경로 정의를 추가합니다.
// - / => HomePage
// - /events => EventsPage
// - /events/<some-id> => EventDetailPage
// - /events/new => NewEventPage
// - /events/<some-id>/edit => EditEventPage
// 3. 모든 페이지 구성 요소 위에 <MainNavigation> 구성 요소를 추가하는 루트 레이아웃을 추가합니다.
// 4. MainNavigation에 제대로 작동하는 링크를 추가합니다.
// 5. MainNavigation의 링크가 활성화될 때 "active" 클래스를 받는지 확인합니다.
// 6. 더미 이벤트 목록을 출력합니다. EventsPage
// 모든 목록 항목에는 해당 EventDetailPage에 대한 링크가 포함되어야 합니다.
// 7. EventDetailPage에서 선택한 이벤트의 ID를 출력합니다.
// 보너스: 모든 /events... 페이지 구성 요소 위에 <EventNavigation> 구성 요소를 추가하는 또 다른 (중첩된) 레이아웃 경로를 추가합니다.

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailPage, { loader as eventsDetailLoader, action as deleteEventAction } from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import EventRoot from "./pages/EventRoot";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import Error from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventRoot />,

          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: ":id",
              id: "event-detail",
              loader: eventsDetailLoader,
              children: [
                { index: true, element: <EventDetailPage />, action: deleteEventAction },
                { path: "edit", element: <EditEventPage />, action: manipulateEventAction },
              ],
            },
            { path: "new", element: <NewEventPage />, action: manipulateEventAction },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
