import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useParams,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import GlobalError from "./components/GlobalError/GlobalError";

// css
import "./index.css";

// routes
import App from "./App";
import Vote from "./routes/Vote/Vote";
import BitWallet from "./routes/BitWallet/Components/body/body";
import Event from "./routes/Events/Event";
import Dashboard from "./routes/Dashboard/Dashboard";

// context
import UserState from "./context/userContext/userState";

// language
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18next
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: ["ar", "en"],
		fallbackLng: "en",
		debug: false,
		// Options for language detector
		detection: {
			order: ["path", "cookie", "htmlTag"],
			caches: ["cookie"],
		},
		// react: { useSuspense: false },
		backend: {
			loadPath: "/assets/locales/{{lng}}/translation.json",
		},
	});
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/vote",
				element: <Vote />,
			},
			{
				path: "/rate",
				element: <Vote />,
			},
			{
				path: "/review",
				element: <Vote />,
			},
			{
				path: "/vote/:eventId",
				element: <RoutedEvent />,
			},
			{
				path: "/bitwallet",
				element: <BitWallet />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/*",
				element: <App />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserState>
			<RouterProvider router={router} />
		</UserState>
	</React.StrictMode>
);
function Layout() {
	return (
		<ErrorBoundary FallbackComponent={GlobalError}>
			<ScrollToTop />
			<Navbar />
			<Outlet />
			<Footer />
		</ErrorBoundary>
	);
}
function RoutedEvent() {
	const navigate = useNavigate();
	const { eventId } = useParams();

	return <Event eventId={eventId} navigate={navigate} />;
}
function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default ScrollToTop;
