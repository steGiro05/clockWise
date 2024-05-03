import createExpoWebpackConfigAsync from '@expo/webpack-config';
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Use the React refresh plugin in development mode
  if (env.mode === "development") {
    config.plugins.push(
      new ReactRefreshWebpackPlugin()
    );
  }
  return config;
};