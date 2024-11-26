import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axiosClient from '@/app/api/axiosClient';

// 定义tree返回类型
interface FaqTree {
  // 根据你的API响应定义类型
  code: number;
  msg: string;
  data: Array<{
    id: string;
    createTime: string;
    updateTime: string;
    createById: string;
    updateById: string;
    name: string;
    parentId: string;
    children: Array<any>;
  }>;
  success: boolean;
  traceId: string;
}

// 定义错误类型
interface FetchFaqError {
  message: string;
}

// 定义list返回类型
interface FaqList {
  // 根据你的API响应定义类型
  code: number;
  msg: string;
  data: {
    pageSize: number;
    pageNo: number;
    totalCount: number;
    cursor: number;
    data: {
      id: string;
      createTime: string;
      updateTime: string;
      createById: string;
      updateById: string;
      question: string;
      answer: string;
      category: {
        id: string;
        name: string,
        code: string
      },
      effectiveType: string,
      effectiveBeginTime: string,
      effectiveEndTime: string,
      tagList: Array<{
        id: string,
        name: string,
        code: string
      }>
    },
    success: boolean;
    traceId: string;
  }
  success: boolean;
}

// 定义detail返回类型
interface FaqDetail {
  code: number;
  msg: string;
  data: {
    id: string;
    createTime: string;
    updateTime: string;
    createById: string;
    updateById: string;
    question: string;
    answer: string;
    category: {
      id: string;
      name: string,
      code: string
    },
    effectiveType: string,
    effectiveBeginTime: string;
    effectiveEndTime: string;
    tagList: Array<{
      id: string,
      name: string,
      code: string
    }>
  }
}

// 定义add返回类型
interface FaqAdd {
  code: number;
  msg: string;
  data: boolean;
  success: boolean;
  traceId: string;
}

// 定义update返回类型
interface FaqUpdate {
  code: number;
  msg: string;
  data: boolean;
  success: boolean;
  traceId: string;
}

// 定义update返回类型

// faq树形结构
export const getFaqTree = createAsyncThunk<FaqTree, void, { rejectValue: FetchFaqError }>(
  'getFaqTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/faq-cate/tree', params, {
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

// faq列表
export const getFaqList = createAsyncThunk<FaqList, void, { rejectValue: FetchFaqError }>(
  'getFaqList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/faq/list', params, {
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
)

// faq详情
export const getFaqDetail = createAsyncThunk<FaqDetail, void, { rejectValue: FetchFaqError }>(
  'getFaqDetail',
  async (id, { rejectWithValue }) => {
    console.log("getFaqDetail", id)
    try {
      const response = await axiosClient.get(`/faq/get/${id}`);
      return response.data;
    } catch (error: any) {
      // 使用 rejectWithValue 来返回错误信息
      return rejectWithValue({ message: error.response.data });
    }
  }
)

// faq列表
export const faqAdd= createAsyncThunk<FaqAdd, void, { rejectValue: FetchFaqError }>(
  'faqAdd',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/faq/add', params, {
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
)

// faq列表
export const faqUpdate = createAsyncThunk<FaqUpdate, void, { rejectValue: FetchFaqError }>(
  'faqUpdate',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/faq/update', params, {
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
)

const initialState = {
  faqTree: {},
  faqList: {},
  faqDetail: {},
  status: '',
  error: null as FetchFaqError | null,
  selectedNode: null // 新增状态来存储选中的节点信息
}

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  // 定义同步的reducers
  reducers: {
    // 这里可以添加一些同步的reducers
    selectNode: (state, action) => {
      console.log('selectNode action:',  action)
      state.selectedNode = action.payload; // 更新选中节点的状态
    },
  },
  // 定义异步的reducers
  extraReducers: (builder) => {
    builder
      .addCase(getFaqTree.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFaqTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqTree = action.payload.data; // 使用返回的数据中的data字段
      })
      .addCase(getFaqTree.rejected, (state, action) => {
        state.status = 'failed';
        // 确保这里的 action.error 是正确的类型
        state.error = action.payload as FetchFaqError;
      })
      .addCase(getFaqList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqList = action.payload.data; // 使用返回的数据中的data字段
      })
      .addCase(getFaqDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqDetail = action.payload.data; // 使用返回的数据中的data字段
      })
  },
});

export const { selectNode } = faqSlice.actions; // 导出 selectNode action
export default faqSlice.reducer;
