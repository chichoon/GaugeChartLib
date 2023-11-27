import type { App } from 'vue';
import GaugeChart from './components/GaugeChart';

const components = [GaugeChart];

const install = (app: App) => {
  if (!app) return;
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

const GaugeChartLib = {
  install
};

export { GaugeChart };

export default GaugeChartLib;
