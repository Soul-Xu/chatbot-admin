import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axiosClient from '@/app/api/axiosClient';

// 定义tree返回类型
interface TagTree {
  code: number,
  msg: string,
  data: Array<{
    id: string,
    createTime: string,
    updateTime: string,
    createById: string,
    createByName: string,
    updateById: string,
    updateByName: string,
    name: string,
    parentId: string,
    children: Array<TagTree>,
    tagType: string
  }>,
  success: boolean,
  traceId: string
}

// 定义错误类型
interface FetchTagError {
  message: string;
}

// tag树形结构
export const getTagTree = createAsyncThunk<TagTree, void, { rejectValue: FetchTagError }>(
  'getTagTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tag-cate/tree', params, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      // 使用 rejectWithValue 来返回错误信息
      return rejectWithValue({ message: error.response.data });
    }
  }
);

const initialState = {
  tagTree: [],
  status: '',
  error: null as FetchTagError | null,
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTagTree: (state, action) => {
      return action.payload;
    },
  },
  // 定义异步的reducers
  extraReducers: (builder) => {
    builder
      .addCase(getTagTree.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
  },
});

export const { setTagTree } = tagSlice.actions;

export default tagSlice.reducer;
