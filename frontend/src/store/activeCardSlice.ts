import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  activeCardId: string | null;
}

const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: {} as { [key: string]: string | null },
  reducers: {
    updateActiveCard: (state, action: PayloadAction<Item>) => {
      state.activeCardId = action.payload.activeCardId;
    }
  }
});

export default activeCardSlice;
