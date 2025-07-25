import { create } from 'zustand';

const globalState = create((set) => ({
  isLog: true,
}));

export default globalState;
