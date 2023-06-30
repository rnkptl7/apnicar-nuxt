import { useCarStore } from "~/stores/CarStore";

export default defineNuxtRouteMiddleware((to, from) => {

  useCarStore().showNav = false;
  const authenticated = useSessionStorage("isLoggedIn", false).value;

  if (!authenticated && (to.path === "/" || to.name === "details-id")) {
    return navigateTo("/login");
  } else if (
    authenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return navigateTo("/");
  }
  return;
});
