import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import PasswordGate from "./components/PasswordGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import Course from "./pages/Course";
import CourseOverview from "./pages/CourseOverview";
import CourseLessons from "./pages/CourseLessons";
import LessonPlayer from "./pages/LessonPlayer";
import DocumentViewer from "./pages/DocumentViewer";

import Flipbook from "./pages/Flipbook";
import { lazy, Suspense } from "react";

const Activity1 = lazy(() => import("./pages/activities/Activity1"));
const Activity2 = lazy(() => import("./pages/activities/Activity2"));
const Activity3 = lazy(() => import("./pages/activities/Activity3"));
const Activity4 = lazy(() => import("./pages/activities/Activity4"));
const Activity5 = lazy(() => import("./pages/activities/Activity5"));
const Activity6 = lazy(() => import("./pages/activities/Activity6"));
const Activity7 = lazy(() => import("./pages/activities/Activity7"));
const Activity8 = lazy(() => import("./pages/activities/Activity8"));
const Activity9 = lazy(() => import("./pages/activities/Activity9"));
const Activity10 = lazy(() => import("./pages/activities/Activity10"));
const Activity11 = lazy(() => import("./pages/activities/Activity11"));
const Activity12 = lazy(() => import("./pages/activities/Activity12"));
const Activity13 = lazy(() => import("./pages/activities/Activity13"));
const Activity14 = lazy(() => import("./pages/activities/Activity14"));
const Activity15 = lazy(() => import("./pages/activities/Activity15"));

function ActivityLoader({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center"><div className="animate-pulse text-[#8B2332] font-semibold">Loading activity...</div></div>}>
      {children}
    </Suspense>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Course} />
        <Route path={"/courses/transitions"} component={CourseOverview} />
        <Route path={"/courses/transitions/lessons"} component={CourseLessons} />
        <Route path={"/lessons/:slug"} component={LessonPlayer} />
        <Route path={"/strategy"} component={DocumentViewer} />
        <Route path={"/report"} component={DocumentViewer} />
        <Route path={"/best-practices"} component={DocumentViewer} />
        <Route path={"/resources"} component={DocumentViewer} />

        <Route path={"/flipbook"} component={Flipbook} />
        <Route path={"/activities/1"}>{() => <ActivityLoader><Activity1 /></ActivityLoader>}</Route>
        <Route path={"/activities/2"}>{() => <ActivityLoader><Activity2 /></ActivityLoader>}</Route>
        <Route path={"/activities/3"}>{() => <ActivityLoader><Activity3 /></ActivityLoader>}</Route>
        <Route path={"/activities/4"}>{() => <ActivityLoader><Activity4 /></ActivityLoader>}</Route>
        <Route path={"/activities/5"}>{() => <ActivityLoader><Activity5 /></ActivityLoader>}</Route>
        <Route path={"/activities/6"}>{() => <ActivityLoader><Activity6 /></ActivityLoader>}</Route>
        <Route path={"/activities/7"}>{() => <ActivityLoader><Activity7 /></ActivityLoader>}</Route>
        <Route path={"/activities/8"}>{() => <ActivityLoader><Activity8 /></ActivityLoader>}</Route>
        <Route path={"/activities/9"}>{() => <ActivityLoader><Activity9 /></ActivityLoader>}</Route>
        <Route path={"/activities/10"}>{() => <ActivityLoader><Activity10 /></ActivityLoader>}</Route>
        <Route path={"/activities/11"}>{() => <ActivityLoader><Activity11 /></ActivityLoader>}</Route>
        <Route path={"/activities/12"}>{() => <ActivityLoader><Activity12 /></ActivityLoader>}</Route>
        <Route path={"/activities/13"}>{() => <ActivityLoader><Activity13 /></ActivityLoader>}</Route>
        <Route path={"/activities/14"}>{() => <ActivityLoader><Activity14 /></ActivityLoader>}</Route>
        <Route path={"/activities/15"}>{() => <ActivityLoader><Activity15 /></ActivityLoader>}</Route>
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <PasswordGate>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </PasswordGate>
    </ErrorBoundary>
  );
}

export default App;
