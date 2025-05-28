export async function enableMocking() {
  // if (import.meta.env.PROD) {
  //   return;
  // }

  const { worker } = await import("@/shared/api/mocks/browser");
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}
