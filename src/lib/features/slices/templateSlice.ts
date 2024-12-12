import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axiosClient from '@/app/api/axiosClient';

// 定义tree返回类型
interface TemplateTree {
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
    children: Array<TemplateTree>,
    tagType: string
  }>,
  success: boolean,
  traceId: string
}

// 定义list返回类型
interface TemplateList {
  // 根据你的API响应定义类型
  code: number;
  msg: string;
  data: {
    pageSize: number;
    pageNo: number;
    totalCount: number;
    cursor: number;
    data: Array<{
      id: string;
      createTime: string;
      updateTime: string;
      createById: string;
      createByName: string;
      updateById: string;
      updateByName: string;
      question: string; // 原JSON中的"subject"在这里被改写为"question"
      answer: string; // 原JSON中的"description"在这里被改写为"answer"
      category: {
        id: string;
        name: string;
        code: string;
      };
      tagList: Array<{
        id: string;
        name: string;
        code: string;
      }>;
      // 原JSON中的"url", "readers", "readerFlag"字段在这里没有定义，如果需要，可以添加
    }>;
    success: boolean;
    traceId: string;
  };
  success: boolean;
}

// 定义detail返回类型
interface TemplateDetail {
  code: number;
  msg: string;
  data: {
    id: string;
    createTime: string;
    updateTime: string;
    createById: string;
    createByName: string; // 原JSON中的"createByName"字段
    updateById: string;
    updateByName: string; // 原JSON中的"updateByName"字段
    question: string; // 原JSON中的"subject"在这里被改写为"question"
    answer: string; // 原JSON中的"description"在这里被改写为"answer"
    category: {
      id: string;
      name: string;
      code: string;
    };
    tagList: Array<{
      id: string;
      name: string;
      code: string;
    }>;
    // 原JSON中的"url", "readers", "readerFlag"字段在这里没有定义，如果需要，可以添加
    // 新增字段，根据您提供的接口定义
    effectiveType: string;
    effectiveBeginTime: string;
    effectiveEndTime: string;
  };
}

// 定义add返回类型
interface TemplateAdd {
  code: number;
  msg: string;
  data: boolean;
  success: boolean;
  traceId: string;
}

// 定义update返回类型
interface TemplateUpdate {
  code: number;
  msg: string;
  data: boolean;
  success: boolean;
  traceId: string;
}

// 定义delete返回类型
interface TemplateDelete {
  code: number;
  msg: string;
  data: boolean;
  success: boolean;
  traceId: string;
}

// 定义错误类型
interface FetchTemplateError {
  message: string;
}

// template树型结构列表
export const getTemplateTree = createAsyncThunk<TemplateTree, void, { rejectValue: FetchTemplateError }>(
  'getTemplateTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl-cate/tree', params, {
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

// template树型结构新增
export const addTemplateTree = createAsyncThunk<TemplateTree, void, { rejectValue: FetchTemplateError }>(
  'addTemplateTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl-cate/add', params, {
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

// template树型结构编辑
export const updateTemplateTree = createAsyncThunk<TemplateTree, void, { rejectValue: FetchTemplateError }>(
  'updateTemplateTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl-cate/update', params, {
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

// template树型结构删除
export const deleteTemplateTree = createAsyncThunk<TemplateTree, void, { rejectValue: FetchTemplateError}>(
  'deleteTemplateTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/review-tmpl-cate/delete/${params}`,  {
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

// template列表
export const getTemplateList = createAsyncThunk<TemplateList, void, { rejectValue: FetchTemplateError }>(
  'getTemplateList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl/list', params, {
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

// template详情
export const getTemplateDetail = createAsyncThunk<TemplateDetail, void, { rejectValue: FetchTemplateError }>(
  'getTemplateDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/review-tmpl/get/${id}`);
      return response.data;
    } catch (error: any) {
      // 使用 rejectWithValue 来返回错误信息
      return rejectWithValue({ message: error.response.data });
    }
  }
)

// template新增
export const templateAdd= createAsyncThunk<TemplateAdd, void, { rejectValue: FetchTemplateError }>(
  'templateAdd',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl/add', params, {
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

// template编辑
export const templateUpdate = createAsyncThunk<TemplateUpdate, void, { rejectValue: FetchTemplateError }>(
  'templateUpdate',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/review-tmpl/update', params, {
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

// template删除
export const templateDelete = createAsyncThunk<TemplateDelete, void, { rejectValue: FetchTemplateError }>(
  'templateDelete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/review-tmpl/delete/${id}`);
      return response.data;
    } catch (error: any) {
      // 使用 rejectWithValue 来返回错误信息
      return rejectWithValue({ message: error.response.data });
    }
  }
)

const initialState = {
  templateTree: [],
  templateTreeAdd: null,
  templateTreeUpdate: null,
  templateTreeDelete: null,
  templateList: null,
  templateDetail: null,
  templateAdd: null,
  templateUpdate: null,
  templateDelete: null,
  status: '',
  error: null as FetchTemplateError | null,
  nodeTemplatePaths: [], // 存储树形结构对应的所有路径
  selectedTemplateNode: null, // 存储当前选中的节点
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  // 定义同步的reducers
  reducers: {
    // 这里可以添加一些同步的reducers
    saveTemplateNodePaths: (state, action) => {
      state.nodeTemplatePaths = action.payload; // 更新节点路径的状态
    },
    selectTemplateNode: (state, action) => {
      state.selectedTemplateNode = action.payload; // 更新选中节点的状态
    },
  },
  // 定义异步的reducers
  extraReducers: (builder) => {
    builder
      .addCase(getTemplateTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateTree = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(addTemplateTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateTreeAdd = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(updateTemplateTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateTreeUpdate = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(deleteTemplateTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateTreeDelete = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(getTemplateList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateList = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(getTemplateDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateDetail = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(templateAdd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateAdd = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(templateUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateUpdate = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(templateDelete.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.templateDelete = action?.payload?.data; // 使用返回的数据中的data字段
      })
  },
});

export const { saveTemplateNodePaths, selectTemplateNode } = templateSlice.actions; // 导出 selectFaqNode action

export default templateSlice.reducer;
