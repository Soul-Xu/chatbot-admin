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

// 定义addTag返回类型
interface AddTag {
  code: number;
  msg: string;
  data: Tag;
  success: boolean;
  traceId: string;
}

// 定义updateTag返回类型
interface UpdateTag {
  code: number;
  msg: string;
  data: Tag;
  success: boolean;
  traceId: string;
}

// 定义list返回类型
interface Category {
  id: string;
  name: string;
  code: string;
}

interface Synonym {
  id: string;
  name: string;
  code: string;
}

interface Tag {
  id: string;
  createTime: string;
  updateTime: string;
  createById: string;
  createByName: string;
  updateById: string;
  updateByName: string;
  name: string;
  tagType: string;
  parentId: string; // 假设这是需要添加的字段，具体值取决于您的业务逻辑
  useCount: number;
  category: Category;
  synonymList: Synonym[];
}

interface TagList {
  code: number;
  msg: string;
  data: Tag[];
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

// tag树型结构新增
export const addTagTree = createAsyncThunk<AddTag, void, { rejectValue: FetchTagError }>(
  'addTagTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tag-cate/add', params, {
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

// tag树型结构编辑
export const updateTagTree = createAsyncThunk<UpdateTag, void, { rejectValue: FetchTagError }>(
  'updateTagTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tag-cate/update', params, {
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

// tag树型结构删除
export const deleteTagTree = createAsyncThunk<TagTree, void, { rejectValue: FetchTagError }>(
  'deleteTagTree',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/tag-cate/delete/${params}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    }
    catch (error: any) {
      // 使用 rejectWithValue 来返回错误信息
      return rejectWithValue({ message: error.response.data });
    }
  }
);

// tag列表
export const getTagList = createAsyncThunk<TagList, void, { rejectValue: FetchTagError }>(
  'getTagList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tag/list', params, {
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

// tag新增
// tag列表
export const addTag = createAsyncThunk<TagList, void, { rejectValue: FetchTagError }>(
  'addTag',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tag/add', params, {
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
  tagTree: [],
  tagTreeAdd: null,
  tagTreeUpdate: null,
  tagTreeDelete: null,
  tagList: null,
  tagDetail: null,
  tagAdd: null,
  tagUpdate: null,
  tagDelete: null,
  status: '',
  error: null as FetchTagError | null,
  nodeTagPaths: [], // 存储树形结构对应的所有路径
  selectedTagNode: null, // 存储当前选中的节点
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    // 这里可以添加一些同步的reducers
    saveTagNodePaths: (state, action) => {
      state.nodeTagPaths = action.payload; // 更新节点路径的状态
    },
    selectTagNode: (state, action) => {
      state.selectedTagNode = action.payload; // 更新选中节点的状态
    },
  },
  // 定义异步的reducers
  extraReducers: (builder) => {
    builder
      .addCase(getTagTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagTree = action?.payload?.data; // 使用返回的数据中的data字段
      })
       .addCase(addTagTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagTreeAdd = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(updateTagTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagTreeUpdate = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(deleteTagTree.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagTreeDelete = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(getTagList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagList = action?.payload?.data; // 使用返回的数据中的data字段
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // @ts-ignore
        state.tagAdd = action?.payload?.data; // 使用返回的数据中的data字段
      })
  },
});

export const { saveTagNodePaths, selectTagNode } = tagSlice.actions;

export default tagSlice.reducer;
