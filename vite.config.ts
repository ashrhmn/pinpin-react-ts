import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import { useRecoilValue } from "recoil";
// import { baseUrlState } from "./src/store";

// const baseUrl = useRecoilValue(baseUrlState);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: "/pinpin-react-ts/",
  // base: baseUrl,
});
