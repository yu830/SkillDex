import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.VITE_DEPLOY_TARGET === 'github-pages' ? '/SkillDex/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
